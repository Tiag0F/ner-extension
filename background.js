import * as tf from '@tensorflow/tfjs';

const model = await tf.loadLayersModel("./resources/model/model.json");