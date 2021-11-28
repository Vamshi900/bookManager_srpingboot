import React from 'react';
import 'antd/dist/antd.css';
import './dataTable.css';

import { Table,Space} from 'antd';
import UpdateBook from '../UpdateBook/UpdateBook';

const tableProperties ={
    bordered: true,
    loading: false,
    size: 'small',
    title: ()=>'Your Book List',
    showHeader:true,
    scroll: { xScroll: true,yScroll: true ,x:1500, y: 400  },
    tableLayout: 'Fixed',
    bottom: 'bottomRight',
}

// add actions if not exist
const addActions =(columns,actions)=>{
  if(columns.findIndex(col=>col.title ==='Action')===-1){
    columns.push(actions)
  }
}


const DataTable = (props)=>{
  const {columns,data,deleteBook,updateBook}=props

  const actions = {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 150,
    render: (record) => (
      <Space size="middle">
        <UpdateBook  className='actionButton' updateBook={updateBook} data={record}/>
        <span className='actionButton' onClick={() => deleteBook(record)} >Delete</span>
      </Space>
    ),
  }

  addActions(columns,actions)
  const tableColumns = columns.map(item => ({ ...item, ellipsis:true }));

    return( <Table
        {...tableProperties}
        className="dataTable"
        pagination={{ pageSizeOptions: ['10','20','30','50'] }}
        columns={tableColumns}
        dataSource={data}
        sticky
      />

);}

export default DataTable;
