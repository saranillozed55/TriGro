FROM python:3.14

# set the current working directory to /code
# where we will place requirements.txt file and the app directory
WORKDIR /code


COPY ./requirements.txt /code/requirements.txt

#install the package dependencies in the requirements file
#--no-cache-dir option tells pip to not save the downloaded packages locally
# --upgrade tells option tells pip to upgrade the packages if they are already installed
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code

#  uvicorn app.main:app --host 0.0.0.0(network interfaces/proxy headers) --port 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

