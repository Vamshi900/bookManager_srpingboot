#!/usr/bin/env python3.6
import random
import time

from faker import Faker
import mysql.connector 

POSSIBLE_STATES = ['ACTIVE', 'INACTIVE']
faker = Faker('en')

class MySqlSeeder:

    def __init__(self):
        config = {
            'user': 'root',
            'password': 'spring',
            'host': 'localhost',
            'port': '3306',
            'database': 'library'
        }
        # leaving out the retry loop for the sake of simplicity
        # self.connection = mysql.connector.connect(**config,auth_plugin='mysql_native_password')
        self.connection = mysql.connector.connect(user='root', password='spring',
                              host='scanbook-db', database='library',
                              auth_plugin = 'mysql_native_password',)
        self.cursor = self.connection.cursor()

    def seed(self):
        print("Clearing old data...")
        self.drop_books_table()
        print("Start seeding...")
        self.create_books_table()
        self.inser_books()

        self.connection.commit()
        self.cursor.close()
        self.connection.close()
        print("Done")

    def create_books_table(self):
        sql = '''
        CREATE TABLE books(
          isbn VARCHAR(255) PRIMARY KEY,
          author VARCHAR(255),
          notes VARCHAR(255),
          pages INT,
          status BIT(1),
          title VARCHAR(255)
        );
        '''
        self.cursor.execute(sql)

    def inser_books(self):
        for _ in range(300):
            sql = '''
            INSERT INTO books (isbn, author, notes, pages, status, title)
            VALUES (%(isbn)s, %(author)s, %(notes)s, %(pages)s, %(status)s,%(title)s );
            '''
            user_data = {
                'isbn': faker.isbn13().replace("-", ""),
                'author': faker.name(),
                'notes': '',
                'pages': faker.pyint(),
                'status': faker.boolean(chance_of_getting_true=50),
                'title': faker.name(),
            }
            self.cursor.execute(sql, user_data)

    def drop_books_table(self):
        self.cursor.execute('DROP TABLE IF EXISTS books;')

MySqlSeeder().seed()