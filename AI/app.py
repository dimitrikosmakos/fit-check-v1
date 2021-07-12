from __future__ import division
import flask 
import json
import argparse
import numpy as np
import torch
import sys
from mmcv import Config
from mmcv.runner import load_checkpoint
from mmfashion.core import AttrPredictor
from mmfashion.core import CatePredictor
from mmfashion.models import build_predictor
from mmfashion.utils import get_img_tensor

#Attribute and Category Predictor Class
class FitCheckPredictor:
	def __init__(self, args):
		#Setup config and checkpoint file, optional cuda flag if hardware supports
		self.args = {
			"checkpoint":"checkpoint/CateAttrPredict/vgg/global/latest.pth",
			"config":"configs/category_attribute_predict/global_predictor_vgg.py",
			"use_cuda":False
		}
		
	def build_model(self):
		self.cfg = Config.fromfile(self.args["config"])
		# global attribute predictor will not use landmarks
		# just set a default value
		self.landmark_tensor = torch.zeros(8)
		#build model based on config
		self.model = build_predictor(self.cfg.model)
		load_checkpoint(self.model, self.args["checkpoint"], map_location='cpu')
		print('model loaded from {}'.format(self.args["checkpoint"]))
		if self.args["use_cuda"]:
		    self.model.cuda()
		    self.landmark_tensor = self.landmark_tensor.cuda()
		#finish model creation
		self.model.eval()
		
	#Return json object of image attributes
	def get_json_attr(self, prob, predictor, top):
		if isinstance(prob, torch.Tensor):
			data = prob.data.cpu().numpy()
		elif isinstance(prob, np.ndarray):
			data = prob
		indexes = np.argsort(data[0])[::-1]
		top = 10
		retVal = []
		for i in indexes[:top]:
			retVal.append({"name":predictor.attr_idx2name[i], "probability":float(data[0][i])})
		return retVal
	
	#Return json object of image categories
	def get_json_cate(self, prob, predictor, top):
		#Some cleanup code
		if isinstance(prob, torch.Tensor):
			data = prob.data.cpu().numpy()
		elif isinstance(prob, np.ndarray):
			data = prob
		#get the indices based on the probabilities sorted descending
		indexes = np.argsort(data[0])[::-1]
		#top-k categories to pick
		top = 10
		retVal = []
		for i in indexes[:top]:
			retVal.append({"name":predictor.cate_idx2name[i], "probability":float(data[0][i])})
		return retVal
	
	#Given an image, return the category and attributes of the image
	def get_image_results(self, img):
		img_tensor = get_img_tensor(img, self.args["use_cuda"])
		# predict probabilities for each attribute/category
		attr_prob, cate_prob = self.model(
			img_tensor, attr=None, landmark=self.landmark_tensor, return_loss=False)
		attr_predictor = AttrPredictor(self.cfg.data.test)
		cate_predictor = CatePredictor(self.cfg.data.test)
		attributes = self.get_json_attr(attr_prob, attr_predictor, 10)
		categories = self.get_json_cate(cate_prob, cate_predictor, 10)
		return json.dumps({"attributes":attributes, "categories":categories})

#Build the predictor class
predictor = FitCheckPredictor(sys.argv)
predictor.build_model()

#This is the web entry point to which you can post the file information to get
app = flask.Flask(__name__)
@app.route("/get-analysis", methods=['POST'])
def home(): # route handler function
	# returning a response
	filename = flask.request.get_json(silent=True)['filename']
	res = flask.Response(predictor.get_image_results(filename))
	res.headers['Content-Type'] = "application/json"
	return res

app.run(port=8000, debug = True)
