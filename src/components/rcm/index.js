import RcmSelect from "./RcmSelect";
import Search from "./RcmSearch";
import FieldInput from './FieldInput';

const components = [
  RcmSelect,
  Search,
  FieldInput
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  ...components,
}
