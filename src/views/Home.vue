<template>
    <v-header />
    <div class="content-box">
        <div class="content">
            <router-view v-slot="{ Component }">
                <transition name="move" mode="out-in">
                    <div>
                        <component :is="Component"></component>
                    </div>
                </transition>
            </router-view>
        </div>
        <v-footer />
    </div>
</template>

<script setup lang="ts">
import vHeader from '../components/layouts/PageHeader.vue'
import vFooter from '../components/layouts/PageFooter.vue'
</script>
