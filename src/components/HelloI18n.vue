<template>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'HelloI18n',
  setup() {
    const { translate } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })

    // Something todo ..

    return { translate }
  }
})
</script>

<i18n>

</i18n>
