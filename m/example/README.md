# example

## html

````html
<div class="demo" >nimo</div>
<img src="./nimojs.jpeg" />
````

## css

````css
div {
	color:red
}
````

## less

````less
div {
	font-weight:bold;
	&.demo {
		color:green;
	}
}
````

## js


````js
console.log('example demo js');
console.log(1, ...[2, 3, 4], 5);
class Point { 
}
class ColorPoint extends Point {
  constructor(props) {
	  super(props)
  }
}

var cp = new ColorPoint();
console.log(cp)
````

## code

````code
{
    file: './entry.js',
    run:false
}
````

<script src="./entry.js" ></script>