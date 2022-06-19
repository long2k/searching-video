import cv2
from imageio import save
import numpy
from skimage.feature import local_binary_pattern;
import sys

import save_vector

def get_LBP(path, url):
    img = cv2.imread(path)
    img = cv2.resize(img,(256,256))
    image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    lbp_image = local_binary_pattern(image, 8, 1, method='default')
    hist, _ = numpy.histogram(lbp_image.ravel(), density=True, bins=256, range=(0, 256))
    save_vector.save_vectors(hist, url)
    return True

get_LBP(sys.argv[1],sys.argv[2])

sys.stdout.flush()

   
