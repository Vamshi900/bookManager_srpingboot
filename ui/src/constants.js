
import React from 'react';

import {Tag } from 'antd';

const getStatus =(status)=>{
  let color = status > 0 ? 'purple' : 'green';
  let text = status > 0 ? 'read' : 'notyet';

    return  <>
      <Tag color={color} key={0}>
              {text}
            </Tag>
      </>
};



export const columns = [
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      width:200 
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Pages',
      width: 100,
      dataIndex: 'pages',
      sorter: (a, b) => (a.pages - b.pages) ,
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      filters: [
        {
          text: 'read',
          value: 1,
        },
        {
          text: 'notyet',
          value: 0,
        },
      ],
      render: getStatus,
      onFilter: (value, record) => record.status === 0,
    },
  ]

 export const data = [];
  for (let i = 1; i <= 1000; i++) {
    data.push({
      key: i,
      isbn: `123456789012${i}`,
      author: `Author  ${i} New York No. Lake Park`,
      title: `Title ${i}2 years old, living in New York No. ${i} Lake Park.`,
      pages: parseInt(`${i}2`),
      notes: `notes ${i}2 years old, living in New York No. ${i} Lake Park.`,
      status: (i%2)
    });
  }


