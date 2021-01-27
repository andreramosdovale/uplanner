<template>
    <section class="">
        <h2>Crie a Sua Conta</h2>
        <button class="btn" @click="criar = true">Criar Conta</button>
        <UsuarioForm/>
    </section>
</template>

<script>

import UsuarioForm from '@/components/templates/UsuarioForm'

export default {
name: "CreateLogin",
    components: {UsuarioForm}
}
</script>

<style scoped>

</style>