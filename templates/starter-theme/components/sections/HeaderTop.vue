<template>
<div class="relative">
    <si-app-loader placement="BEFORE_TOP_HEADER"/>
    <div class="h-2 bg-primary"></div>
    <div class=" sticky top-0 left-0 right-0">
        <si-app-loader :placement="'BEFORE_TOP_HEADER_STICKY'"/>
    </div>
    <si-app-loader placement="AFTER_TOP_HEADER"/>
</div>
</template>