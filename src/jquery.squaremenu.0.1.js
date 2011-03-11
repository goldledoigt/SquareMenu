jQuery.SquareMenu = function(cfg) {

	console.log("constructor", this, arguments);

	var garbage = [];

	var menu = $.extend(cfg || {}, {
		container:null
		,root:null
		,itemConfig:{
			height:46
			,width:46
			,marginTop:21
		}
		,menuConfig:[{
			label:'ABOUT<br />US'
			,marginTop:15
			,menu:[{
				label:'VIDEO'
			}]
		}, {
			label:'EVENTS'
			,menu:[{
				label:'CASTING<br />CALL'
				,marginTop:15
			}, {
				label:'OPE 2'
			}, {
				label:'OPE 3'
			}]
		}, {
			label:'BECOME A FOUNDING MEMBER'
			,marginTop:7
		}]
	});

	return {

		render:function(id) {
			console.log("render", this, arguments);
			var me = this;
			menu.container = $('<div class="sq-wrap"></div>');
			$("#"+id).prepend(menu.container);
			menu.root = this.addItem();
			menu.root.data('isRoot', true);
			$(menu.root).bind('click', function() {
				me.onItemClick.call(me, this);
			});
			$(menu.container).bind('firstLevelRender', function() {
				me.
				console.log("BIND");
			});
		}

		,addItem:function(config) {
			console.log("addItem", this, arguments);
			var html = this.getItemHtml($.extend({
				label:"HOME"
				,marginTop:0
			}, config || {}));
			var item = $(html);
			menu.container.append(item);
			return item;
		}

		,getItemHtml:function(item) {
			console.log("getItemHtml", this, arguments, menu.itemConfig);
			$.extend(item, menu.itemConfig);
			return ''
				+ '<div class="sq-item-wrap" style="'
				+ 'width:' + item.width + 'px;'
				+ 'height:' + item.height + 'px;'
				+ '">'
				+ '<div class="sq-item-content">'
				+ '<div class="sq-item-middle">'
				+ '<div class="sq-item-inner">'
				+ '<a style="'
				+ 'margin-top:' + item.marginTop + 'px'
				+ '">'
				+ item.label
				+ '</a>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '<div class="sq-item-mask"></div>'
				+ '</div>'
			;
		}

		,onItemClick:function(item) {
			item = $(item);
			console.log("onItemClick", this, item);
			if (item.data('isRoot')) {
				console.log("IS ROOT");
				this.expand();
			}
		}

		,expand:function() {
			console.log("expand", this, arguments);
			var el, item, callback,
			me = this,
			l = menu.menuConfig.length;
			for (var i = 0; i < l; i++) {
				item = menu.menuConfig[i];
				item.el = this.addItem(item);
				// item.el = $(this.getItemHtml(item));
				// menu.container.append(item.el);
				if (i === l - 1) {
					callback = function() {
						me.expandSecondLevel();
					};
				}
				item.el.animate({
					'margin-top':(46 + 10) * (i + 1)
				}, false, callback);
				garbage.push(item.el);
			}
		}

		,expandSecondLevel:function() {
			console.log("expandSecondLevel", this, arguments);
			var l = menu.menuConfig.length, root, el, item, m;
			for (var i = 0; i < l; i++) {
				root = menu.menuConfig[i];
				if (root.menu) {
					m = root.menu.length;
					for (var j = 0; j < m; j++) {
						item = root.menu[j];
						item.el = this.addItem(item);
						// item.el = $(this.getItemHtml(item));
						// menu.container.append(item.el);
						item.el.css('margin-top', root.el.css('margin-top'));
						item.el.animate({
							'margin-left':(46 + 10) * (j + 1)
						});
						garbage.push(item.el);
					}
				}
			}
		}

		,collapse:function() {
			console.log("collapse", this, arguments);
		}

	};

};
