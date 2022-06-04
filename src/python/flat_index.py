
import json
import numpy
import redis
from redis.commands.search.field import VectorField, TextField
from redis.commands.search.query import Query
import uuid
import sys


def connectDB():
    r = redis.Redis(
        host='localhost',
        port=6379,
        password=''
    )
    r.ping()
    return r

def create_flat_index():
    connectDB().ft().create_index([
        TextField("filename"),
        VectorField("vector", "FLAT", {
            "TYPE": "FLOAT32",
            "DIM": 256,  # Số chiều của vector
            "DISTANCE_METRIC": 'L2',  # Sử dụng khoảng cách Euclid để so sánh sự tương đồng
            "INITIAL_CAP": 100,  # Option số lượng vector cần lưu trữ
            "BLOCK_SIZE": 100
        }),
    ])
    print("Index created")
create_flat_index()

sys.stdout.flush()