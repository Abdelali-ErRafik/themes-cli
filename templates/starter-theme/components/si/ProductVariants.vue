<template>
    <div class="options">
        <div v-for="(option, i) in options" :key="i" :class="option.key" class="p-1 mb-1 border bg-gray-50">
            <b class="flex mb-1 capitalize option-name">{{ option.name }}</b>
            <div v-if="!option.hasOwnProperty('style') || option.style == '' || option.style == null  || (option.style !== 'LIST' && option.style !== 'CHECK' && option.style !== 'RADIO') && (option.key !== 'color' && option.style == 'SIZE') || (option.key == 'color' && option.style == 'COLOR') " class="options-list">
                <div v-for="(val, ii) in option.values" :key="ii" class="mx-1 option">
                    <button :class="selected[`option${i+1}`] && selected[`option${i+1}`].value == val._id ? 'active': ''" @click="setVariant(i+1, val._id)" :id="val._id" :style="`${option.key == 'color' ? `background-color:${val.value2}` : ''}`"><small>{{ val.value1 }}</small></button>
                </div>
            </div>

            <!-- Size style for Color option -->
            <div v-if="option.key == 'color' && option.style == 'SIZE'" class="options-list">
                <div v-for="(val, ii) in option.values" :key="ii" class="mx-1 option">
                    <button class="size-style " :class="selected[`option${i+1}`] && selected[`option${i+1}`].value == val._id ? 'active': ''" @click="setVariant(i+1, val._id)" :id="val._id" :style="``"><small>{{ val.value1 }}</small></button>
                </div>
            </div>

            <!-- list style for Color option -->
            <div v-if="option.style == 'LIST' && option.key == 'color'" class="options-list">
                <div class="select-list-option">
                    <select class="select-list" v-model="listStyleColorValue" @change="changeVarColor($event)">
                        <option class="option-of-select" v-for="(val, ii) in option.values" :key="ii" :value="{index: i+1,value: val._id}" >{{ val.value1 }}</option>
                    </select>
                </div>
            </div>

            <!-- list style for size option -->
            <div v-if="option.style == 'LIST' && option.key == 'size'" class="options-list">
                <div class="select-list-option">
                    <select class="select-list" v-model="listStyleSizeValue" @change="changeVarSize($event)" >
                        <option class="option-of-select" v-for="(val, ii) in option.values" :key="ii" :value="{index: i+1,value: val._id}" >{{ val.value1 }}</option>
                    </select>
                </div>
            </div>

            <!-- list style for Other option -->
            <div v-if="option.style == 'LIST' && option.key !== 'size' && option.key !== 'color'" class="options-list">
                <div class="select-list-option">
                    <select class="select-list" v-model="listStyleOtherOption" @change="changeVarOther($event)" >
                        <option class="option-of-select" v-for="(val, ii) in option.values" :key="ii" :value="{index: i+1,value: val._id}" >{{ val.value1 }}</option>
                    </select>
                </div>
            </div>

            <!-- Checkbox style for color option -->
            <div class="list-option" v-if="option.style == 'CHECK' && option.key == 'color'">
                <ul class="list-checkbox-colors">
                    <li v-for="(value, vindex2) in option.values" :key="vindex2">
                        <div class="content-check-style">
                            <input :checked="selected[`option${i+1}`] && selected[`option${i+1}`].value == value._id"  class="check-style" style="cursor:pointer;" @click="selectOneVarColor(vindex2+'check',option.values.length,value._id,i+1)"  name="color" :id="vindex2+'check'" type="checkbox" >
                            <span class="space-between"></span>
                            <label style="cursor:pointer;" :for="vindex2+'check'">{{ value.value1 }}</label>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Checkbox style for size option -->
            <div class="list-option" v-if="option.style == 'CHECK' && option.key == 'size'">
                <ul class="list-checkbox-colors">
                    <li v-for="(value, vindex2) in option.values" :key="vindex2">
                        <div class="content-check-style">
                            <input :checked="selected[`option${i+1}`] && selected[`option${i+1}`].value == value._id"  class="check-style" style="cursor:pointer;" @click="selectOneVarSize(vindex2+'checksize',option.values.length,value._id,i+1)"  name="size" :id="vindex2+'checksize'" type="checkbox" >
                            <span class="space-between"></span>
                            <label style="cursor:pointer;" :for="vindex2+'checksize'">{{ value.value1 }}</label>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Checkbox style for size option -->
            <div class="list-option" v-if="option.style == 'CHECK' && option.key !== 'size' && option.key !== 'color'">
                <ul class="list-checkbox-colors">
                    <li v-for="(value, vindex2) in option.values" :key="vindex2">
                        <div class="content-check-style">
                            <input :checked="selected[`option${i+1}`] && selected[`option${i+1}`].value == value._id"  class="check-style" style="cursor:pointer;" @click="selectOneVarOther(vindex2+'checkother',option.values.length,value._id,i+1)"  name="size" :id="vindex2+'checkother'" type="checkbox" >
                            <span class="space-between"></span>
                            <label style="cursor:pointer;" :for="vindex2+'checkother'">{{ value.value1 }}</label>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Radiobtn style for color option -->
            <div class="list-option" v-if="option.style == 'RADIO'  && option.key == 'color'">
                <ul class="list-radio">
                    <li v-for="(value, vindex2) in option.values" :key="vindex2">
                        <div class="content-radio-style">
                            <input class="radio-style" style="cursor:pointer;" name="color" :id="vindex2+'radiocolor'" :value="value._id" :checked="selected[`option${i+1}`] && selected[`option${i+1}`].value == value._id" @change="setVariant(i+1,value._id)" type="radio" >
                            <span class="space-between"></span>
                            <label style="cursor:pointer;" :for="vindex2+'radiocolor'">{{ value.value1 }}</label>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Radiobtn style for size option -->
            <div class="list-option" v-if="option.style == 'RADIO' && option.key == 'size'">
                <ul class="list-radio">
                    <li v-for="(value, vindex2) in option.values" :key="vindex2">
                        <div class="content-radio-style">
                            <input class="radio-style" style="cursor:pointer;" name="size" :id="vindex2+'radiosize'" :value="value._id" :checked="selected[`option${i+1}`] && selected[`option${i+1}`].value == value._id" @change="setVariant(i+1,value._id)" type="radio" >
                            <span class="space-between"></span>
                            <label style="cursor:pointer;" :for="vindex2+'radiosize'">{{ value.value1 }}</label>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Radiobtn style for other option -->
            <div class="list-option" v-if="option.style == 'RADIO' && option.key !== 'size' && option.key !== 'color'">
                <ul class="list-radio">
                    <li v-for="(value, vindex2) in option.values" :key="vindex2">
                        <div class="content-radio-style">
                            <input class="radio-style" style="cursor:pointer;" name="other" :id="vindex2+'radioother'" :value="value._id" :checked="selected[`option${i+1}`] && selected[`option${i+1}`].value == value._id" @change="setVariant(i+1,value._id)" type="radio" >
                            <span class="space-between"></span>
                            <label style="cursor:pointer;" :for="vindex2+'radioother'">{{ value.value1 }}</label>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="image-option-vr" v-if="option.style == 'IMAGE' && loadImages">
                 <div v-for="(value, vindex3) in option.values" :key="vindex3" class="vr-image-style">
                    <div class="content-image-style">
                        <span v-if="option.key !== 'color' && value.images && value.images.length == 0" :class="selected[`option${i+1}`] && selected[`option${i+1}`].value == value._id ? 'active': ''" @click="setVariant(i+1, value._id)" class="size-style-image syles-image">
                            {{value.value1}}
                        </span>
                        <span v-if="option.key == 'color' && value.images && value.images.length == 0" @click="setVariant(i+1, value._id)" :class="selected[`option${i+1}`] && selected[`option${i+1}`].value == value._id ? 'active': ''" :style="{'background-color': value.value2}" class="color-style-image syles-image">

                        </span>
                        <span :class="selected[`option${i+1}`] && selected[`option${i+1}`].value == value._id ? 'active': ''"  @click="setVariant(i+1, value._id)" v-if="value.images && value.images.length > 0" class="image-style-image syles-image">
                            <nuxt-img  :src="value.images[0].src+`?width=70&height=70`"/>
                        </span>
                    </div>
                </div>
            </div>

        </div>

        <si-product-price v-if="showPrice" class="flex px-1 text-2xl" :type="'simple'" :price="selected.price" :variants="[]"></si-product-price>
    </div>
</template>
<script>
export default {
    props: {
        options: Array,
        variants: Array,
        images:Array,
        showPrice: {type: Boolean, false: true},
    },
    data() {
        return {
            selected: this.variants[0],
            listStyleColorValue:{},
            listStyleSizeValue:{},
            listStyleOtherOption:{},
            loadImages : false
        }
    },
    async fetch(){
        await this.stylesOptions();
        await this.getImageStyle();
    },
    mounted() {

    },
    methods: {
        getImageStyle(){
            for(let option of this.options){
                if(option.style && option.style == 'IMAGE'){
                    for(let val of option.values){
                        for(let variant of this.variants){
                            if(( variant.option1 && val._id == variant.option1.value)
                            || (variant.option2 && val._id == variant.option2.value) ||
                             (variant.option3 && val._id == variant.option3.value) ){
                                for(let img of this.images){
                                    if(variant.imageId == img._id){
                                        if(!val.images) val.images = [];
                                        val.images.push(img);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.loadImages = true;
        },
        stylesOptions(){
            if(this.options && this.options.length > 0){
                for(let i=0; i<this.options.length; i++){
                    if(this.options[i].style == 'LIST' && this.options[i].key == 'color'){
                        this.listStyleColorValue.index = i+1;
                        this.listStyleColorValue.value = this.options[i].values[0]._id;
                    }
                    if(this.options[i].style == 'LIST' && this.options[i].key == 'size'){
                        this.listStyleSizeValue.index = i+1;
                        this.listStyleSizeValue.value = this.options[i].values[0]._id;
                    }
                    if(this.options[i].style == 'LIST' && this.options[i].key !== 'size' && this.options[i].key !== 'color'){
                        this.listStyleOtherOption.index = i+1;
                        this.listStyleOtherOption.value = this.options[i].values[0]._id;
                    }
                }
            }
        },
        selectOneVarColor(id,length,value,index){
            for(let i=0; i<length;i++){
                document.getElementById(i+"check").checked = false;
            }
            document.getElementById(id).checked = true;
            this.setVariant(index,value);
        },
        selectOneVarSize(id,length,value,index){
            for(let i=0; i<length;i++){
                document.getElementById(i+"checksize").checked = false;
            }
            document.getElementById(id).checked = true;
            this.setVariant(index,value);
        },
        selectOneVarOther(id,length,value,index){
            for(let i=0; i<length;i++){
                document.getElementById(i+"checkother").checked = false;
            }
            document.getElementById(id).checked = true;
            this.setVariant(index,value);
        },
        setVariant(index, value) {
            let index1 ,index2;
            if(index == 1){ index1=2; index2=3; }
            if(index == 2){ index1=1; index2=3; }
            if(index == 3){ index1=1; index2=2; }

            if(this.options.length == 3){
                this.selected = this.variants.find(variant => variant[`option${index}`].value == value && variant[`option${index1}`].value == this.selected[`option${index1}`].value && variant[`option${index2}`].value == this.selected[`option${index2}`].value);
            }else if(this.options.length == 2){
                this.selected = this.variants.find(variant => variant[`option${index}`].value == value && variant[`option${index1}`].value == this.selected[`option${index1}`].value);
            }else{
                this.selected = this.variants.find(variant => variant[`option${index}`].value == value);
            }
            this.$emit('selected', this.selected);
        },
        changeVarColor(){
            let value = this.listStyleColorValue.value;
            let index = this.listStyleColorValue.index;
            this.setVariant(index,value);
        },
        changeVarSize(){
            let value = this.listStyleSizeValue.value;
            let index = this.listStyleSizeValue.index;
            this.setVariant(index,value);
        },
        changeVarOther(){
            let value = this.listStyleOtherOption.value;
            let index = this.listStyleOtherOption.index;
            this.setVariant(index,value);
        },
    },
}
</script>
<style scoped>
.options {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.options .options-list{
    display: flex;
    flex-wrap: wrap;
}
.options .option {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 5px;
}
.options .option button {
    border-radius: 3px;
    background: #fff;
    padding: 5px 10px;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
}



.options .color .option button {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    color: transparent;
    overflow: hidden;
    position: relative;
}
.options .color .option button.active{
    color: transparent;
    box-shadow: 0 0 0px 2px white, 0 0 0px 4px var(--primary-color)
}

.options .option button.size-style {
    border-radius: 3px;
    background: #fff;
    padding: 5px 10px;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.1) !important;
    color: #333333;
    width:auto;
    height:auto;
}

.options .option button.active {
    color: white;
    background-color: var(--primary-color);
}

.options .option button.size-style.active{
    color: white;
    background-color: var(--primary-color);
}

.options-list .select-list-option .select-list{
   /* Reset Select */
  appearance: none;
  outline: 0;
  border: 0;
  box-shadow: none;
  /* Personalize */
  flex: 1;
  padding: 0 1em;
  color: #1e1e1e;
  background-color: #f0f0f0;
  background-image: none;
  cursor: pointer;
}

/* Remove IE arrow */
.options-list .select-list-option .select-list::-ms-expand {
  display: none;
}

/* Custom Select wrapper */
.options-list .select-list-option{
  position: relative;
  display: flex;
  width: 14em;
  height: 3em;
  border-radius: .25em;
  overflow: hidden;
}

/* Arrow */
.options-list .select-list-option::after {
  content: '\25BC';
  position: absolute;
  top: -5px;
  right: 0;
  padding: 1em;
  background-color: #f0f0f0;
  transition: .25s all ease;
  pointer-events: none;
}

/* Transition */
.options-list .select-list-option:hover::after {
  color: #f39c12;
}

.list-option{
  margin-bottom: 12px;
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
}

.list-option .options-key{
  margin-top: 8px;
  margin-right: 17px;
}

  .list-checkbox-colors,
  .list-radio{
    display: flex;
  }

  .list-checkbox-colors li,
  .list-radio li{
    padding-right: 15px;
  }

  .check-style{
    width: 20px;
    height: 20px;
  }

  .content-check-style{
    align-items: center;
    display: flex;
  }

  .radio-style{
    width: 20px;
    height: 20px;
  }

  .content-radio-style{
    align-items: center;
    display: flex;
  }

   .list-checkbox-colors li,
  .list-radio li{
    padding-right: 15px;
  }

  .check-style{
    width: 20px;
    height: 20px;
  }

  .content-check-style{
    align-items: center;
    display: flex;
  }

  .option-of-select{
    direction: ltr;
  }

  .space-between{
    margin-right:3px;
    margin-left: 3px;
  }

    .vr-image-style{
        margin-right: 5px;
    }

    .vr-image-style .content-image-style{
        width: 60px;
        height: 60px;
        position: relative;
    }

    .image-option-vr{
        display: flex;
    }

    .vr-image-style .content-image-style .syles-image{
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        cursor: pointer;
        margin-right: 5px;
        width: 60px;
        height: 60px;
    }

    .vr-image-style .content-image-style .syles-image.active{
        border: 4px solid #009688;
        border-radius: 10px;
        overflow: hidden;
    }

    .vr-image-style .content-image-style .size-style-image{
        background-color: #fff;
        text-align: center;
        padding-top: 17px;
        padding-bottom: 13px;
    }

    .vr-image-style .content-image-style .color-style-image{
        background-color: #e6199b;
        text-align: center;
        padding-top: 17px;
        padding-bottom: 13px;
    }

    .vr-image-style .content-image-style .image-style-image img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }


</style>
