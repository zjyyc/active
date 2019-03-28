import React from 'react';
import ReactDOM from 'react-dom'; 
import "./detail.less";
class Page extends React.Component {

    componentWillMount(){
        let self = this;
        $.get('http://abc.wanwantoo.com/home/Index/userInfoFind' + window.location.search , function(json){
            self.setState(json)
        })
    }
    render(){
        var self = this;
        if(!this.state){
            return (<div />)
        }
        return (
            <div className='content'>
                <table>
                    <tbody>
                        <tr>
                            <td className='label1'>姓名：</td>
                            <td className='text'>{this.state.names}</td>
                            <td className='label1'> </td>
                            <td className='text'></td>
                        </tr>
                        <tr>
                            <td className='label1'>移动电话：</td>
                            <td className='text'>{this.state.telephone}</td>
                            <td className='label1'>固定电话：</td>
                            <td className='text'>{this.state.f_telephone}</td>
                        </tr>
                        <tr>
                            <td className='label1'>地址：</td>
                            <td className='text'>{this.state.address}</td>
                            <td className='label1'>电子信箱：</td>
                            <td className='text'>{this.state.email}</td>
                        </tr>
                        <tr>
                            <td className='label1'>证件类型：</td>
                            <td className='text'>{this.state.d_type}</td>
                            <td className='label1'>证件号码：</td>
                            <td className='text'>{this.state.number}</td>
                        </tr>
                        <tr>
                            <td className='label1'>开户支行：</td>
                            <td className='text'>{this.state.bank_branch}</td>
                            <td className='label1'>银行帐号：</td>
                            <td className='text'>{this.state.bank_account}</td>
                        </tr>
                        <tr>
                            <td className='label1'>持卡人姓名：</td>
                            <td className='text'>{this.state.c_name}</td>
                            <td className='label1'></td>
                            <td className='text'></td>
                        </tr>

                        <tr >
                            <td className='label1 h300'>身份证正面：</td>
                            <td className='text h300'>
                                <div className='pic' style={{backgroundImage : 'url('+this.state.card_photos+'?x-oss-process=image/resize,m_fixed,w_750)'}}></div>
                            </td>
                            <td className='label1 h300'>身份证反面：</td>
                            <td className='text h300'>
                                <div className='pic' style={{backgroundImage : 'url('+this.state.card_photoss+'?x-oss-process=image/resize,m_fixed,w_750)'}}></div>
                            </td>
                        </tr>
                        <tr>
                            <td className='label1 h300'>银行卡正面：</td>
                            <td className='text h300'>
                                <div className='pic' style={{backgroundImage : 'url('+this.state.bank_photos+'?x-oss-process=image/resize,m_fixed,w_750)'}}></div>
                            </td>
                            <td className='label1 h300'>银行卡反面：</td>
                            <td className='text h300'>
                                <div className='pic' style={{backgroundImage : 'url('+this.state.photos+'?x-oss-process=image/resize,m_fixed,w_750)'}}></div>
                            </td>
                        </tr>
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