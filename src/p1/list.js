import React from 'react';
import ReactDOM from 'react-dom'; 
import "./list.less";


class Page extends React.Component {
    componentWillMount(){
        let self = this;
        $.get('http://abc.wanwantoo.com/home/Index/index' , function(json){
            console.log(JSON.parse(json));
            self.setState({
                list : JSON.parse(json)
            })
        })
    }
    go(id){
        window.open('detail.htm?id=' + id);
    }
    render(){
        var self = this;
        if(!this.state){
            return (<div></div>)
        }
        return (
            <div className='container'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th >姓名</th>
                            <th >移动电话</th>
                            <th >地址</th>
                            <th >证件号码</th>
                            <th >开户支行</th>
                            <th >详情</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.list.map(function(item , key){
                                return (
                                    <tr key={key}>
                                        <td ><div className="name">{item.names}</div></td>
                                        <td ><div className="tel">{item.telephone}</div></td>
                                        <td ><div className="address">{item.address}</div></td>
                                        <td ><div className="idcard">{item.number}</div></td>
                                        <td ><div className="bank">{item.bank_branch}</div></td>
                                        <td ><div className="detail">
                                            <button type="button" className="btn btn-primary" onClick={self.go.bind(this , item.id)}>用户详情</button>
                                        </div></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> 

            </div>
        )
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);