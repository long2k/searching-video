import cv2
from imageio import save
import numpy
from skimage.feature import local_binary_pattern;
import sys
import json
import save_vector

def compare_vector(path):
    img = cv2.imread(path)
    img = cv2.resize(img,(256,256))
    image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    lbp_image = local_binary_pattern(image, 8, 1, method='default')
    hist, _ = numpy.histogram(lbp_image.ravel(), density=True, bins=256, range=(0, 256))
    result = save_vector.check(hist.astype(numpy.float32).tobytes())
    return result


# compare_vector(r"C:\Users\ADMIN\Desktop\searching-video\src\python\anh.jpg")
print(compare_vector(sys.argv[1]))
sys.stdout.flush()

