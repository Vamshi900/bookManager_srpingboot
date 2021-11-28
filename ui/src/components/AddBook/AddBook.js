import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Input, Radio } from 'antd';
import './addBook.css'
import validateIsbn from '../../utils';

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Add a new Book"
      okText="Add"
      cancelText="Cancel"
      onCancel={()=>{
        form.resetFields();
        onCancel()}}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          status:false
        }}
      >
               <Form.Item
          name="isbn"
          label="ISBN"

          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (validateIsbn(value)) {
                  return Promise.resolve();
                }
  
                return Promise.reject(new Error('This not a valid isbn'));
              },
            })
          ]}
        >
          <Input type="number" maxlength = "13"/>
        </Form.Item>

        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[
            {
              required: true,
              message: 'Please input the author of book!',
            },
          ]}
        >
          <Input />
        </Form.Item>  

        <Form.Item
          name="pages"
          label="Number of Pages"
          rules={[
            {
              required: true,
              message: 'Please input the no.of pages in the book!',
            },
          ]}
        >
          <Input  type="number"/>
        </Form.Item>  


        <Form.Item name="notes" label="Notes">
          <Input type="textarea" />
        </Form.Item>

        <Form.Item name="status" className="collection-create-form_last-form-item">
        <Radio.Group value={false}>
            <Radio value={false}>Not Read</Radio>
            <Radio value={true}>Read</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddBook = (props) => {
  const {addBook}=props
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    addBook(values) // container method to handle business logic
    setVisible(false);
  };

  return (
    <div className='addBook'>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Book
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {

          setVisible(false);
        }}
      />
    </div>
  );
}

export default AddBook;

