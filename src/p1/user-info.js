import React from 'react';
import ReactDOM from 'react-dom'; 
import "./user-info.less";

class Page extends React.Component {
    componentWillMount(){
        this.setState({
            names : {} ,
            telephone : {} , 
            // f_telephone: {} ,
            // email: {} ,
            d_type: {} ,
            // c_name: {} ,
            address: {} ,
            number: {} ,
            bank_branch: {},
            bank_account: {} ,
            card_photos : {} ,
            card_photoss : {} ,
            bank_photos : {} 
            // photos : {} 
        })
        setTimeout(function(){
            $('#check')[0].checked = 'checked';
        } , 200)
    }
    upload(item ,  e){
        let self = this;
        item.error = '';
        if(e.target.files.length > 0){
            var file = e.target.files[0];
            item.localSrc = window.URL.createObjectURL(file);
            if(file.size > 15 * 1000 * 1000 && user.type > 0){
                return alert('文件尺寸过大' , '对不起，单个文件最大支持15M');
            }
            var data = new FormData();
            item.key = new Date().getTime() % 100000000 + '' + parseInt(Math.random() * 1000)  + '.' + file.name.split('.').reverse()[0].toLocaleLowerCase();
            item.status = 0;
            self.setState(self.state);
            data.append('key' , item.key);
            data.append('policy' , 'eyJleHBpcmF0aW9uIjoiMjA2Ni0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==');
            data.append('OSSAccessKeyId' , 'LTAImRM0DKxCPkdL');
            data.append('signature' , 'sjudNgSMRQr5fJlqMBmX78Mhy80=');
            data.append('success_action_status' , '200');
            data.append('file', file);
            $.ajax({
                url: 'http://img99.oss-cn-zhangjiakou.aliyuncs.com/',
                type: 'POST',
                cache: false,
                data: data,
                processData: false,
                contentType: false,
                xhr:function(){
                    var xhr = $.ajaxSettings.xhr(); 
                    if(xhr.upload){ 
                        xhr.upload.addEventListener('progress',function(e){
                            item.status = e.loaded / e.total * 100;
                            self.setState(self.state);
                        }, false);   
                    }  
                    return xhr;
                },
            }).done(function(res) {
                item.value = 'http://x.eat163.com/' + item.key;
                item.error = '';
                console.log(res);
            }).fail(function(res) {
                console.log(res);
            }); 
        }
    }
    input(name , e){
        var item = this.state[name];
        item.error = false;
        item.value = e.target.value.trim().slice(0 , 100);
        this.setState(this.state);
    }
    check(key , node){
        if(!node.value){
            node.error = 'has-error';
            return false;
        }
        if(key == 'telephone'){
            if(!(/^1\d{10}$/.test(node.value))){ 
                node.error = 'has-error';
                return false; 
            } 
        }
        return true;
    }
    submit(){
        var item = this.state;
        var flag = false;
        for(var key in item){
            if(!this.check(key , item[key])){
                if(!flag){
                    flag = key;
                }
            }
        }
        if(flag){
            this.setState(this.state);
            window.location.hash = '';
            window.location.hash = '#' + flag;
            return;
        }
        $.post('http://abc.wanwantoo.com/home/Index/submissInfo' , {
            names : item.names.value , 
            telephone: item.telephone.value , 
            // f_telephone: item.f_telephone.value , 
            // email: item.email.value , 
            d_type: item.d_type.value , 
            // c_name: item.c_name.value , 
            address: item.address.value , 
            number: item.number.value , 
            bank_branch: item.bank_branch.value , 
            bank_account: item.bank_account.value , 
            card_photos: item.card_photos.value , 
            card_photoss: item.card_photoss.value , 
            bank_photos: item.bank_photos.value , 
            // photos : item.photos.value 
        } , function(json){
            if(json.code == 200){
                alert('提交成功!')
                window.location.reload();
            }
            else{
                alert(json.msg);
            }
            console.log(json);
        } , 'json');
    }

    render(){
        let self = this;        
        if(!this.state){
            return ;
        }
        return (
            <div id='content'>
                <div className='container'>
                    <div className={"form-group " + this.state.names.error } id='names'>
                        <div className='line'>
                            <label>姓名：</label>
                            <input className="form-control" onChange={this.input.bind(this , 'names')} value={this.state.names.value} placeholder="格式：张三"  spellCheck="false" />
                            <div className='important'>*</div>
                            <div className='clear-float'></div>
                        </div>
                        <div className='error-msg'>格式：张三</div>
                    </div>
                    <div className={"form-group " + this.state.telephone.error } id='telephone'>
                        <div className='line'>
                            <label>移动电话：</label>
                            <input className="form-control" onChange={this.input.bind(this , 'telephone')} value={this.state.telephone.value} placeholder="格式：15088888888(同时接受指令下达人的资金划拔人信息）"  spellCheck="false" />
                            <div className='important'>*</div>
                            <div className='clear-float'></div>
                        </div>
                        <div className='error-msg'>格式：15088888888(同时接受指令下达人的资金划拔人信息）</div>
                    </div>
                    
                    <div className={"form-group " + this.state.address.error } id='address'>
                        <div className='line'>
                            <label>地址：</label>
                            <input className="form-control" onChange={this.input.bind(this , 'address')} value={this.state.address.value} placeholder="地址：xx省xx市xx(区、县)xx路"  spellCheck="false" />
                            <div className='important'>*</div>
                            <div className='clear-float'></div>
                        </div>
                        <div className='error-msg'>地址：xx省xx市xx(区、县)xx路</div>
                    </div>
                    <div className={"form-group " + this.state.d_type.error } id='d_type'>
                        <div className='line'>
                            <label>证件类型：</label>
                            <select className="form-control type" onChange={this.input.bind(this , 'd_type')}  value={this.state.d_type.value}>
                                <option value=''>请选择</option>
                                <option >身份证</option>
                                <option >军官证</option>
                                <option >国内护照</option>
                                <option >户口本</option>
                                <option >学员证</option>
                                <option >退休证</option>
                                <option >临时身份证</option>
                                <option >组织机构代码</option>
                                <option >营业执照</option>
                                <option >警官证</option>
                                <option >解放军士兵证</option>
                                <option >回乡证</option>
                                <option >外国护照</option>
                                <option >港澳台居民身份证</option>
                                <option >台湾通行证及其他有效旅行证</option>
                                <option >海外客户编号</option>
                                <option >解放军文职干部证</option>
                                <option >武警文职干部证</option>
                                <option >武警士兵证</option>
                                <option >重号身份证</option>
                                <option >批文或证明</option>
                                <option >无证件</option>
                                <option >法人代码证</option>
                                <option >其他证明文件（公司）</option>
                                <option >其他身份证明文件（个人）</option>
                                <option >其它</option>
                            </select>
                            <div className='important'>*</div>
                            <div className='clear-float'></div>
                        </div>
                        <div className='error-msg'>请选择证件类型</div>
                    </div>
                    <div className={"form-group " + this.state.number.error } id='number'>
                        <div className='line'>
                            <label>证件号码：</label>
                            <input className="form-control" onChange={this.input.bind(this , 'number')} value={this.state.number.value} placeholder="格式：410103XXXXXXXXXXXX(18位数字或字母)"  spellCheck="false" />
                            <div className='important'>*</div>
                            <div className='clear-float'></div>
                        </div>
                        <div className='error-msg'>格式：410103XXXXXXXXXXXX(18位数字或字母)</div>
                    </div>
                    
                    <div className={"form-group " + this.state.bank_branch.error } id='bank_branch'>
                        <div className='line'>
                            <label>开户支行：</label>
                            <input className="form-control" onChange={this.input.bind(this , 'bank_branch')} value={this.state.bank_branch.value} placeholder="格式：中国银行郑州市二七区XX支行XX路分理处"  spellCheck="false" />
                            <div className='important'>*</div>
                            <div className='clear-float'></div>
                        </div>
                        <div className='error-msg'>格式：中国银行郑州市二七区XX支行XX路分理处</div>
                    </div>
                    <div className={"form-group " + this.state.bank_account.error } id='bank_account'>
                        <div className='line'>
                            <label>银行帐号：</label>
                            <input className="form-control" onChange={this.input.bind(this , 'bank_account')} value={this.state.bank_account.value} placeholder="银卡帐号"  spellCheck="false" />
                            <div className='important'>*</div>
                            <div className='clear-float'></div>
                        </div>
                        <div className='error-msg'>银卡帐号不能为空</div>
                    </div>
                    
                    <div className="form-group has-pic" >
                        <label>身份证：</label>
                        <div id='card_photos' className={'up-pic ' + this.state.card_photos.error} style={{backgroundImage : 'url('+ (this.state.card_photos.localSrc || '#')+')'}}>
                            {this.state.card_photos.localSrc ? '' : '正面'}
                            <input type="file" name="file" onChange={self.upload.bind(this , this.state.card_photos )} accept="image/gif,image/jpeg,image/jpg,image/png,image/bmp" />
                            <div className='upload-mask' style={{height : (100-this.state.card_photos.status) + '%'}}></div>
                        </div>
                        <div id='card_photoss' className={'up-pic up-pic2 ' + this.state.card_photoss.error} style={{backgroundImage : 'url('+ (this.state.card_photoss.localSrc || '#')+')'}}>
                            {this.state.card_photoss.localSrc ? '' : '反面'}
                            <input type="file" name="file" onChange={self.upload.bind(this , this.state.card_photoss )} accept="image/gif,image/jpeg,image/jpg,image/png,image/bmp" />
                            <div className='upload-mask' style={{height : (100-this.state.card_photoss.status) + '%'}}></div>
                        </div>
                        <div className='clear-float'></div>
                    </div>
                    <div className="form-group has-pic">
                        <label>银行卡正面：</label>
                        <div id='bank_photos' className={'up-pic ' + this.state.bank_photos.error} style={{backgroundImage : 'url('+ (this.state.bank_photos.localSrc || '#')+')'}}>
                            {this.state.bank_photos.localSrc ? '' : '银行卡正面：'}
                            <input type="file" name="file" onChange={self.upload.bind(this , this.state.bank_photos )} accept="image/gif,image/jpeg,image/jpg,image/png,image/bmp" />
                            <div className='upload-mask' style={{height : (100-this.state.bank_photos.status) + '%'}}></div>
                        </div>
                        <div className='clear-float'></div>
                    </div>
                    <div className='clear-float'></div>
                    <div className='ft'>
                        <a target='_blank' href='http://x.eat163.com/59845331104.htm'>风险说明</a>
                        <span><input type='checkbox' id='check' />本人/本单位已认真阅读以上风险说明并完全理解和同意</span>
                        <div className='clear-float'></div>
                        <button type="button" className="btn btn-primary" onClick={this.submit.bind(this)}>提交</button>
                    </div>
                </div>
            </div>
        )
    }
};


ReactDOM.render(
    <Page />,
    document.getElementById('root')
);


/**
    <div className={"form-group " + this.state.f_telephone.error } id='f_telephone'>
        <div className='line'>
            <label>固定电话：</label>
            <input className="form-control" onChange={this.input.bind(this , 'f_telephone')} value={this.state.f_telephone.value} placeholder="格式：0371-6788888"  spellCheck="false" />
            <div className='important'>*</div>
            <div className='clear-float'></div>
        </div>
        <div className='error-msg'>格式：0371-6788888</div>
    </div>
    <div className={"form-group " + this.state.email.error } id='email'>
        <div className='line'>
            <label>电子邮箱：</label>
            <input className="form-control" onChange={this.input.bind(this , 'email')} value={this.state.email.value} placeholder="格式：XXX@163.com、XXX@qq.com等等"  spellCheck="false" />
            <div className='important'>*</div>
            <div className='clear-float'></div>
        </div>
        <div className='error-msg'>格式：XXX@163.com、XXX@qq.com等等</div>
    </div>
    <div className={"form-group " + this.state.c_name.error } id='c_name'>
        <div className='line'>
            <label>持卡人姓名：</label>
            <input className="form-control" onChange={this.input.bind(this , 'c_name')} value={this.state.c_name.value} placeholder="持卡人姓名"  spellCheck="false" />
            <div className='important'>*</div>
            <div className='clear-float'></div>
        </div>
        <div className='error-msg'>持卡人姓名不能为空</div>
    </div>

    <div className="form-group has-pic">
        <label>银行卡正面：</label>
        <div id='bank_photos' className={'up-pic ' + this.state.bank_photos.error} style={{backgroundImage : 'url('+ (this.state.bank_photos.localSrc || '#')+')'}}>
            {this.state.bank_photos.localSrc ? '' : '银行卡正面：'}
            <input type="file" name="file" onChange={self.upload.bind(this , this.state.bank_photos )} accept="image/gif,image/jpeg,image/jpg,image/png,image/bmp" />
            <div className='upload-mask' style={{height : (100-this.state.bank_photos.status) + '%'}}></div>
        </div>
        <div className='clear-float'></div>
    </div>
    <div className="form-group has-pic">
        <label style={{'lineHeight' : '20px' , 'marginTop' : '9px'}}>手持身份证、银行卡正面：</label>
        <div id='photos' className={'up-pic ' + this.state.photos.error}  style={{backgroundImage : 'url('+ (this.state.photos.localSrc || '#')+')'}}>
            {this.state.photos.localSrc ? '' : '手持身份证、银行卡正面'}
            <input type="file" name="file" onChange={self.upload.bind(this , this.state.photos )} accept="image/gif,image/jpeg,image/jpg,image/png,image/bmp" />
            <div className='upload-mask' style={{height : (100-this.state.photos.status) + '%'}}></div>
        </div>
        <div className='clear-float'></div>
    </div>

**/



