import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt,faTrashAlt,faCode,faBold,faList,faCheckSquare } from '@fortawesome/free-solid-svg-icons'


const solidIcons = [faPencilAlt,faTrashAlt,faCode,faBold,faList,faCheckSquare];
// const regularIcons = [faHandPointRight];
// const bransIcons = [faChrome];


solidIcons.forEach(icon => library.add(icon));
// regularIcons.forEach(icon => library.add(icon));
// bransIcons.forEach(icon => library.add(icon));

Vue.component('fa', FontAwesomeIcon);