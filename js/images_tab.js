/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-05-26 23:28:26
 * @version $Id$
 */

(function($) {


    var Tab = function(tab,date,Class) {
        var _this = this;
        this.tab = tab;
        this.date=date;
        this.Class=Class;
        //默认配置参数
        this.config = {
            //定义触发事件
            "triggerType": "mouseover",
            //定义切换动画效果
            "effect": "default",
            //默认初始显示位置
            "invoke": 1,
            //自动切换时间
            "auto": false
        };


        //扩展默认参数
        if (this.getConfig()) {
            $.extend(this.config, this.getConfig());
        };


        //获取tab下的li和对应的内容列表
        this.tabItems = this.tab.find(Class.items);
        this.contentItems = this.tab.find(Class.conItems);
        

        //保存配置参数
        var config=this.config;

        //绑定驱动事件
        this.tabItems.bind(config.triggerType,function(event){
        	_this.invoke($(this));
        	 event.stopPropagation();//阻止冒泡
        });

        //判断是否自动切换
        if(config.auto){

        	this.timer=null;
        	this.loop =0;
        	this.autoPlay();
        	this.tab.hover(function(){
        		window.clearInterval(_this.timer);
        	},function(){
        		_this.autoPlay();
        	});
        };


        //默认初始显示列表
        if(config.invoke>1 && config.invoke<=this.tabItems.length){
        	this.invoke(this.tabItems.eq(config.invoke-1));
        };


    };//Tab结束


    Tab.prototype = {


    	//自动切换函数
    	autoPlay:function(){
    		var _this=this;
    		var tabItems=this.tabItems;
    		var tabLength=tabItems.length;
    		config =this.config;

    		this.timer=window.setInterval(function(){
    			_this.loop++;
    			if(_this.loop>=tabLength){
    				_this.loop=0;
    			};
    			tabItems.eq(_this.loop).trigger(config.triggerType);

    		},config.auto);
    	},


    	//事件驱动函数
    	invoke:function(currentTab){
    		var _this=this;
    		var Class=this.Class;
    		var index=currentTab.index();
    		currentTab.addClass(Class.actived).siblings().removeClass(Class.actived);
    		var effect=this.config.effect;
    		var conItems=this.contentItems;
    		if(effect==="default"){
    			conItems.eq(index).addClass(Class.current).siblings().removeClass(Class.current);
    		}else if(effect==="fade"){
    			conItems.eq(index).fadeIn().siblings().fadeOut();
    		}else{
                conItems.eq(index).show().siblings().hide();
                }
                ;

    		if(this.config.auto){
    			this.loop=index;
    		};
    	},


        // 获取配置参数
        getConfig: function() {
            var config = this.date;

            if (config && config != "") {
                return  config;//$.parseJSON(config);
            } else {
                return null;
            }
        }
    };

    //初始化函数
   /*Tab.init =function(tabs){
    	var _this=this;
    	tabs.each(function(){
    		new _this($(this));
    	});
    };*/

     //注册为jquery方法
    $.fn.extend({
        tab:function(date,Class){
            this.each(function(){
                new Tab($(this),date,Class);
            });
					return this;
        }
    });
    window.Tab = Tab;//让匿名函数外能获取匿名函数的值
})(jQuery);
