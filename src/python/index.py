import cv2
import numpy
from skimage.feature import local_binary_pattern;
import sys

def get_LBP(path):
    img = cv2.imread(str(path))
    resize_image = cv2.resize(img, (256, 256))
    image = cv2.cvtColor(resize_image, cv2.COLOR_BGR2GRAY)
    lbp_image = local_binary_pattern(image, 8, 1, method='default')
    hist, _ = numpy.histogram(lbp_image.ravel(), density=True, bins=256, range=(0, 255))
    # print(lbp_image)
    return hist

print(get_LBP(sys.argv[1]))

sys.stdout.flush()

   
