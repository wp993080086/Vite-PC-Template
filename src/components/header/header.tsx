import { defineComponent } from 'vue'
import styles from './header.module.scss'
import Logo from '@/static/images/logo.png'

export default defineComponent({
  name: 'FormComponent',
  setup() {
    return () => (
      <div id={styles.header_box}>
        <img src={Logo} alt="logo" class={styles.logo} />
      </div>
    )
  }
})