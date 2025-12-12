# import json
# from pymongo import MongoClient

# # ---------------------------------------------
# # MONGO CONNECTION (YOUR CREDS)
# # ---------------------------------------------
# MONGO_URI = "mongodb+srv://prosmart:prosmart@cluster0.jokss9k.mongodb.net/?appName=Cluster0"
# DATABASE_NAME = "prosmart_db"

# client = MongoClient(MONGO_URI)
# db = client[DATABASE_NAME]

# categories_col = db["categories"]
# subcategories_col = db["subcategories"]
# products_col = db["products"]

# print("✔ Connected to MongoDB")


# # ---------------------------------------------
# # IMPORT FUNCTION
# # ---------------------------------------------
# def import_data(json_path):

#     with open(json_path, "r", encoding="utf-8") as f:
#         data = json.load(f)

#     products_data = data["products"]

#     for category_name, category_obj in products_data.items():

#         category_id = category_obj["category_id"]

#         # -----------------------------
#         # Insert Category
#         # -----------------------------
#         categories_col.update_one(
#             {"category_id": category_id},
#             {
#                 "$set": {
#                     "category_id": category_id,
#                     "category_name": category_name
#                 }
#             },
#             upsert=True
#         )

#         # -----------------------------
#         # Subcategories
#         # -----------------------------
#         for subcat_name, subcat_obj in category_obj["subcategories"].items():

#             subcat_id = subcat_obj["subcategory_id"]

#             subcategories_col.update_one(
#                 {"subcategory_id": subcat_id},
#                 {
#                     "$set": {
#                         "subcategory_id": subcat_id,
#                         "subcategory_name": subcat_name,
#                         "category_id": category_id
#                     }
#                 },
#                 upsert=True
#             )

#             # -----------------------------
#             # Products
#             # -----------------------------
#             for product in subcat_obj["products"]:

#                 product["category_id"] = category_id
#                 product["subcategory_id"] = subcat_id

#                 # ensure image_urls exists
#                 product["image_urls"] = product.get("image_urls", [])

#                 products_col.update_one(
#                     {"product_id": product["product_id"]},
#                     {"$set": product},
#                     upsert=True
#                 )

#     print("✔ Data imported successfully into MongoDB")


# # ---------------------------------------------
# # RUN
# # ---------------------------------------------
# import_data("prosmart1.json")

import json
from pymongo import MongoClient

# ---------------------------------------------
# MONGO CONNECTION
# ---------------------------------------------
MONGO_URI = "mongodb+srv://prosmart:prosmart@cluster0.jokss9k.mongodb.net/?appName=Cluster0"
DATABASE_NAME = "prosmart_db"

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

categories_col = db["categories"]
subcategories_col = db["subcategories"]
products_col = db["products"]

print("✔ Connected to MongoDB")


def import_data(json_path):

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    products_root = data["products"]

    # MAIN CATEGORY LOOP
    for main_cat_name, main_cat_data in products_root.items():

        # FORMAT A - DIRECT CATEGORY OBJECT (has category_id)
        if "category_id" in main_cat_data:
            process_category(main_cat_name, main_cat_data, parent=None)
            continue

        # FORMAT B - INNER CATEGORIES (loop inside)
        for inner_cat_name, inner_cat_obj in main_cat_data.items():
            process_category(inner_cat_name, inner_cat_obj, parent=main_cat_name)

    print("✔ Data imported successfully into MongoDB")


def process_category(category_name, category_obj, parent=None):

    category_id = category_obj["category_id"]

    # Insert category
    categories_col.update_one(
        {"category_id": category_id},
        {
            "$set": {
                "category_id": category_id,
                "category_name": category_name,
                "parent_category": parent
            }
        },
        upsert=True
    )

    # Loop subcategories
    for subcat_name, subcat_obj in category_obj["subcategories"].items():

        subcat_id = subcat_obj["subcategory_id"]

        # Insert subcategory
        subcategories_col.update_one(
            {"subcategory_id": subcat_id},
            {
                "$set": {
                    "subcategory_id": subcat_id,
                    "subcategory_name": subcat_name,
                    "category_id": category_id
                }
            },
            upsert=True
        )

        # Insert products
        for product in subcat_obj["products"]:

            product["category_id"] = category_id
            product["category_name"] = category_name
            product["subcategory_id"] = subcat_id
            product["subcategory_name"] = subcat_name
            product["main_category"] = parent or category_name

            product["image_urls"] = product.get("image_urls", [])

            products_col.update_one(
                {"product_id": product["product_id"]},
                {"$set": product},
                upsert=True
            )


# -----------------------------
# RUN
# -----------------------------
import_data("merged.json")
