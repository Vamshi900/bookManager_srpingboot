FROM python:3.6.4-alpine3.7

RUN pip install pipenv

COPY requirements* /
RUN python -m pip install -r requirements.txt

COPY seed-mysql.py /
CMD python3 /seed-mysql.py