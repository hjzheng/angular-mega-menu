# angular-mega-menu 

This is angular mega menu, base on [angular-ui/bootstrap](https://github.com/angular-ui/bootstrap) dropdown directive and [geedmo/yamm3](https://github.com/geedmo/yamm3).

Angular mega menu is extend from dropdown directive, so you use it just like using dropdown directive.

### How to Use
- Include JavaScript and CSS.

```html
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="bower_components/yamm3/yamm/yamm.css">
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="src/js/angular-mega-menu.js"></script>
```

- Configure angular module

```js
angular.module('test', ['mega-menu']);
```

- Use bootstrap-ui dropdown directive
    - Use dropdown directive.
    - **Set `toggle-event` attribute, default value is `'click'`, you can set value `'mouseover'`.**

```html
...
<li class="dropdown" dropdown>
  <a class="dropdown-toggle" dropdown-toggle toggle-event="mouseover" href="#">Classic<b class="caret"></b></a>
  <ul role="menu" class="dropdown-menu">
    <li><a tabindex="-1" href="#"> Action </a></li>
    <li><a tabindex="-1" href="#"> Another action </a></li>
    <li><a tabindex="-1" href="#"> Something else here </a></li>
    <li class="divider"></li>
    <li><a tabindex="-1" href="#"> Separated link </a></li>
  </ul>
</li>
...
```
### Example

Please visit http://get-set.cn/angular-mega-menu/

### How to extend angular directive

You can refer [Experiment: Decorating Directives](http://angular-tips.com/blog/2013/09/experiment-decorating-directives/) or [My Note](https://github.com/hjzheng/CUF_meeting_knowledge_share/issues/34)
