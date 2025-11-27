/**
 * Date: 12/7/20
 */

 import {createApp} from 'vue'
 import App from "./App";
 import router from "./router";
 import store from "./store";
 // 注册全局组件
import RcmComponents from "@/components/rcm";
 import { 
   NavBar, 
   Button, 
   SwipeItem, 
   Swipe, 
   Grid, 
   GridItem,
   List,
   PullRefresh,
   Cell,
   Col, 
   Row,
   Pagination, 
   SwipeCell, 
   ActionSheet,
   Popup, 
   Form, 
   Field, 
   CellGroup,
   Checkbox, CheckboxGroup,
   Picker,
   Tab, Tabs ,
   Loading,Collapse, 
   CollapseItem,Dialog ,
   Icon,DatetimePicker ,Calendar,
   Area,
   Uploader ,
   Tag,
   Image as VanImage ,Step, Steps,
   TabbarItem ,Tabbar,
   ImagePreview,
 } from 'vant';
 import './utils/flexible';
 import Hammer  from "hammerjs"
 
 import { areaList } from '@vant/area-data';
 
 const app = createApp(App);
 import "./styles/index.less"
 
 import "./utils/permission";
 
 // support 桌面端
 import '@vant/touch-emulator';
 app.directive('tap', {
   beforeMount(el, binding) {
     const hammerTest = new Hammer(el);
     hammerTest.on("tap", binding.value);    
   }
 })
 
 app.directive('press', {
   beforeMount(el, binding) {
     const hammerTest = new Hammer(el);
     hammerTest.on("press", binding.value);
   }
 })
 
 router.afterEach(guard =>{
   if(guard.meta.name){
       document.title = guard.meta.name;
   }
 });
 
 app.use(RcmComponents);
 app.use(store);
 app.use(router);
 // vant ui
 app.use(NavBar);
 app.use(Button);
 app.use(SwipeItem);
 app.use(Swipe);
 app.use(Grid);
 app.use(GridItem);
 app.use(List);
 app.use(PullRefresh);
 app.use(Cell);
 app.use(Col);
 app.use(Row);
 app.use(Pagination);
 app.use(SwipeCell);
 app.use(Popup);
 app.use(Form);
 app.use(Field);
 app.use(CellGroup);
 app.use(Picker);
 app.use(ActionSheet);
 
 app.use(Tab);
 app.use(Tabs);
 app.use(Tabbar);
 app.use(TabbarItem);
 app.use(Loading);
 app.use(Collapse);
 app.use(CollapseItem);
 app.use(Dialog);
 app.use(Icon);
 app.use(DatetimePicker);
 app.use(Calendar);
 app.use(Area);
 app.use(Uploader);
 app.use(Tag);
 
 app.use(Checkbox);
 app.use(CheckboxGroup);
 app.use(VanImage);
 
 app.use(Step);
 app.use(Steps);
 app.use(ImagePreview);
 
 
 
 app.mount("#app");
 
 
 