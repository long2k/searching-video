import cv2
import numpy
from skimage.feature import local_binary_pattern;
import sys

def get_LBP(path):
    img = cv2.imread(path)
    # return img
    image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    lbp_image = local_binary_pattern(image, 8, 1, method='default')
    hist, _ = numpy.histogram(lbp_image.ravel(), density=True, bins=256, range=(0, 255))
    # return hist
    return hist

print(get_LBP(sys.argv[1]))

sys.stdout.flush()

   
