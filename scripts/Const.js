var K_SPACE = 32;

var tool =
{
	random :function(x, y, isInt)
	{
		var temp = Math.random() * (y - x) + x;
		
		if(isInt)
		{
			return parseInt(temp);
		}
		else
		{
			return temp;
		}
	},
	
	hitTestObject : function(objB, objA)
	{
		
		var minx = objB.loc.x > objA.loc.x ? objB.loc.x :objA.loc.x;
		var maxx = objB.loc.x + objB.width < objA.loc.x + objA.width ? objB.loc.x + objB.width : objA.loc.x + objA.width ;
		var miny = objB.loc.y > objA.loc.y ? objB.loc.y : objA.loc.y;
		var maxy = objB.loc.y + objB.width < objA.loc.y + objA.width ? objB.loc.y + objB.width : objA.loc.y + objA.width;
		
		if (minx <= maxx && miny <= maxy) {return true;}
		else {return false;}
	}	
};

