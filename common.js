var getDragClass=(function(){
var SupportsTouches = ("createTouch" in document),//判断是否支持触摸
	StartEvent = SupportsTouches ? "touchstart" : "mousedown",//支持触摸式使用相应的事件替代
	MoveEvent = SupportsTouches ? "touchmove" : "mousemove",
	EndEvent = SupportsTouches ? "touchend" : "mouseup",
	$=function(id){
		return document.getElementById(id);
	},
	preventDefault=function(ev){
		if(ev)ev.preventDefault();
		else window.event.returnValue = false;
	},
	getMousePoint=function(ev){
		var x = y = 0,
			doc = document.documentElement,
			body = document.body;
			if(!ev) ev=window.event;
			if (window.pageYoffset) {
				x = window.pageXOffset;
				y = window.pageYOffset;
			}else{
				x = (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
				y = (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
			}
			if(SupportsTouches){
				var evt = ev.touches.item(0);//仅支持单点触摸,第一个触摸点
				x=evt.pageX;
				y=evt.pageY;
			}else{
				x += ev.clientX;
				y += ev.clientY;
			}
			return {'x' : x, 'y' : y};
	};
	function _drag(opt){
		this.el=typeof opt.el=='string'?$(opt.el):opt.el;//被拖动节点
		this.onstart=opt.start || new Function();//
		this.onmove=opt.move || new Function();
		this.onend=opt.end || new Function();
		this.action=false;
		this.init();
	}
	_drag.prototype={
		init:function(){
			this.el.style.position='relative';
			this.el['on'+StartEvent]=this.bind(function(e){//绑定节点的 [鼠标按下/触摸开始] 事件
				preventDefault(e);
				if(this.action)return false;
				else this.action=true;
				this.startPoint=getMousePoint(e);
				this.onstart();
				document['on'+MoveEvent]=this.bind(function(e){
					preventDefault(e);//取消文档的默认行为[鼠标移动、触摸移动]
					this.nowPoint=getMousePoint(e);
					this.el.style.left=this.nowPoint.x-this.startPoint.x+'px';
					this.el.style.top=this.nowPoint.y-this.startPoint.y+'px';
					this.onmove();
				},this);
				document['on'+EndEvent]=document['ontouchcancel']=this.bind(function(){
					document['on'+EndEvent]=document['ontouchcancel']=document['on'+MoveEvent]=null;
					this.action=false;
					this.onend();
				},this);
			},this);
		},
		bind:function(fn,obj){
			return function(){
				fn.apply(obj,arguments);
			}
		},
		tool:null
	}
	return function(opt){
		return new _drag(opt);
	}
})();
var a=getDragClass({
	el:'dragElement',
	move:function(){
		var subx=this.nowPoint.x-this.startPoint.x,
			suby=this.nowPoint.y-this.startPoint.y,
			id='div';
		if(subx<-245 && subx>-295 && suby<-195 && suby>-245){
			id+=1;
		}else if(subx<-245 && subx>-295 && suby>295 && suby<345){
			id+=3;
		}else if(subx>245 && subx<295 && suby<-195 && suby>-245){
			id+=2;
		}else if(subx>245 && subx<295 && suby>295 && suby<345){
			id+=4;
		}else return;
		id=document.getElementById(id);
		id.style.border='1px solid #000';
		id.style.background='red';
	},
	end:function(){
		this.el.style.left='0';
		this.el.style.top='0';
	}
});
