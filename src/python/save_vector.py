
import json
import numpy
import redis
from redis.commands.search.field import VectorField, TextField
from redis.commands.search.query import Query
import uuid


# Tạo kết nối đến DB
def connectDB():
    r = redis.Redis(
        host='localhost',
        port=6379,
        password=''
    )
    r.ping()
    return r


def save_vectors(vector, url):
    r = connectDB()
    value = {}
    key = str(uuid.uuid4())
    p = r.pipeline(transaction=False)
    value['url'] = url
    value['vector'] = vector.astype(numpy.float32).tobytes()
    p.hset(key, mapping=value)
    p.execute()

def create_flat_index():
    connectDB().ft().create_index([
        TextField("url"),
        VectorField("vector", "FLAT", {
            "TYPE": "FLOAT32",
            "DIM": 256,  # Số chiều của vector
            "DISTANCE_METRIC": 'L2',  # Sử dụng khoảng cách Euclid để so sánh sự tương đồng
            "INITIAL_CAP": 100,  # Option số lượng vector cần lưu trữ
            "BLOCK_SIZE": 100
        }),
    ])
    print("Index created")


def check(vector):
    q = Query(f'*=>[KNN 3 @vector $vec_param AS vector_score]').sort_by('vector_score').return_fields(
        "vector_score", "filename").dialect(2)
    params_dict = {"vec_param": vector}
    results = connectDB().ft().search(q, query_params=params_dict)
    return results

def get_vectors_JSON():
    r = connectDB()
    vector_dict = r.hgetall("image:*")
    print(vector_dict)

