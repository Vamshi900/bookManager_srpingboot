import React, { useState } from 'react';
import 'antd/dist/antd.css';
import {  Modal, Form, Input, Radio } from 'antd';
import './updateBook.css'


const CollectionCreateForm = ({ visible, onCreate, onCancel,intialData }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Update Book"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
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
        initialValues={intialData}
      >
               <Form.Item
          name="isbn"
          label="ISBN"

          rules={[
            {
              // pattern: new RegExp("/^(?:\d{9}[\dXx]|\d{13})$/"),
              required: true,
              message: 'ISBN',
            },
            
          ]}
        >
          <Input type="number" maxlength = "13" disabled  />
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

const UpdateBook = (props) => {
  const {updateBook,status}=props
  const [visible, setVisible] = useState(status);

  console.log(props.data);
  console.log('updated');

  const onCreate = (values) => {
    setVisible(false);
    updateBook(values)
  };
  return (
    <div>
      <span
       className='actionButton'
        onClick={(record) => {
          setVisible(true);
        }}
      >
        Update
      </span>

      
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        intialData={props.data}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}

export default UpdateBook;

