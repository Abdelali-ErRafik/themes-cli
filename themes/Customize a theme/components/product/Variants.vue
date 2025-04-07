<script setup lang="ts">
// Props
const props: any = defineProps({
  options: Array,
  variants: Array,
  images: Array,
});

// Reactive State
const selected = ref(props.variants[0]);
const listStyleColorValue = ref({});
const listStyleSizeValue = ref({});
const listStyleOtherOption = ref({});
const loadImages = ref(false);

const emit = defineEmits(['selected']);

// Methods
const getImageStyle = () => {
  for (const option of props.options) {
    if (option.style === 'IMAGE') {
      for (const val of option.values) {
        for (const variant of props.variants) {
          if (
            (variant.option1 && val._id === variant.option1.value) ||
            (variant.option2 && val._id === variant.option2.value) ||
            (variant.option3 && val._id === variant.option3.value)
          ) {
            for (const img of props.images) {
              if (variant.imageId === img._id) {
                if (!val.images) val.images = [];
                val.images.push(img);
              }
            }
          }
        }
      }
    }
  }
  loadImages.value = true;
};

const stylesOptions = () => {
  if (props.options && props.options.length > 0) {
    props.options.forEach((opt: any, i) => {
      if (opt.style === 'LIST' && opt.key === 'color') {
        listStyleColorValue.value = { index: i + 1, value: opt.values[0]._id };
      }
      if (opt.style === 'LIST' && opt.key === 'size') {
        listStyleSizeValue.value = { index: i + 1, value: opt.values[0]._id };
      }
      if (opt.style === 'LIST' && opt.key !== 'size' && opt.key !== 'color') {
        listStyleOtherOption.value = { index: i + 1, value: opt.values[0]._id };
      }
    });
  }
};

const setVariant = (index: any, value: any) => {
  let index1: any, index2: any;
  if (index === 1) {
    index1 = 2;
    index2 = 3;
  }
  if (index === 2) {
    index1 = 1;
    index2 = 3;
  }
  if (index === 3) {
    index1 = 1;
    index2 = 2;
  }

  if (props.options.length === 3) {
    selected.value = props.variants.find(
      (variant: any) =>
        variant[`option${index}`].value === value &&
        variant[`option${index1}`].value ===
          selected.value[`option${index1}`].value &&
        variant[`option${index2}`].value ===
          selected.value[`option${index2}`].value
    );
  } else if (props.options.length === 2) {
    selected.value = props.variants.find(
      (variant: any) =>
        variant[`option${index}`].value === value &&
        variant[`option${index1}`].value ===
          selected.value[`option${index1}`].value
    );
  } else {
    selected.value = props.variants.find(
      (variant: any) => variant[`option${index}`].value === value
    );
  }

  emit('selected', selected.value);
};

const changeVarColor = () => {
  const value = listStyleColorValue.value.value;
  const index = listStyleColorValue.value.index;
  setVariant(index, value);
};

const changeVarSize = () => {
  const value = listStyleSizeValue.value.value;
  const index = listStyleSizeValue.value.index;
  setVariant(index, value);
};

const changeVarOther = () => {
  const value = listStyleOtherOption.value.value;
  const index = listStyleOtherOption.value.index;
  setVariant(index, value);
};

// Lifecycle Hooks
onMounted(async () => {
  await stylesOptions();
  await getImageStyle();
});
</script>

<template>
  <!--  -->
  <div class="gap-4 options">
    <!--  -->
    <div
      v-for="(option, i) in props.options"
      :key="i"
      class="flex flex-col gap-2"
      :class="option.key"
    >
      <!-- Name -->
      <h2 class="text-sm font-medium capitalize text-gray">
        {{ option.name }}
      </h2>
      <!-- Name -->

      <!-- Option -->
      <div
        v-if="
          !option.hasOwnProperty('style') ||
          option.style == '' ||
          option.style == null ||
          (option.style !== 'LIST' &&
            option.style !== 'CHECK' &&
            option.style !== 'CHECK2' &&
            option.style !== 'RADIO' &&
            option.style !== 'RADIO2' &&
            option.key !== 'color' &&
            option.style == 'SIZE') ||
          (option.key == 'color' && option.style == 'COLOR')
        "
        class="options-list"
      >
        <div v-for="(val, ii) in option.values" :key="ii" class="option mr-f-2">
          <button
            :id="val._id"
            aria-label="colors button"
            :class="
              selected[`option${i + 1}`] &&
              selected[`option${i + 1}`].value == val._id
                ? 'active'
                : ''
            "
            :style="`${option.key == 'color' ? `background-color:${val.value2}` : ''}`"
            @click="setVariant(i + 1, val._id)"
          >
            <small class="text-xs">{{ val.value1 }}</small>
          </button>
        </div>
      </div>
      <!-- Option -->

      <!-- Size style for Color option -->
      <div
        v-if="option.key == 'color' && option.style == 'SIZE'"
        class="options-list"
      >
        <div v-for="(val, ii) in option.values" :key="ii" class="option mr-f-2">
          <button
            :id="val._id"
            aria-label="sizes button"
            class="size-style"
            :class="
              selected[`option${i + 1}`] &&
              selected[`option${i + 1}`].value == val._id
                ? 'active'
                : ''
            "
            :style="``"
            @click="setVariant(i + 1, val._id)"
          >
            <small class="text-xs">{{ val.value1 }}</small>
          </button>
        </div>
      </div>
      <!-- Size style for Color option -->

      <!-- list style for Color option -->
      <div
        v-if="option.style == 'LIST' && option.key == 'color'"
        class="options-list"
      >
        <div class="select-list-option">
          <select
            v-model="listStyleColorValue"
            class="select-list"
            @change="changeVarColor($event)"
          >
            <option
              v-for="(val, ii) in option.values"
              :key="ii"
              class="option-of-select"
              :value="{ index: i + 1, value: val._id }"
            >
              {{ val.value1 }}
            </option>
          </select>
        </div>
      </div>
      <!-- list style for Color option -->

      <!-- list style for size option -->
      <div
        v-if="option.style == 'LIST' && option.key == 'size'"
        class="options-list"
      >
        <div class="select-list-option">
          <select
            v-model="listStyleSizeValue"
            class="select-list"
            @change="changeVarSize($event)"
          >
            <option
              v-for="(val, ii) in option.values"
              :key="ii"
              class="option-of-select"
              :value="{ index: i + 1, value: val._id }"
            >
              {{ val.value1 }}
            </option>
          </select>
        </div>
      </div>
      <!-- list style for size option -->

      <!-- list style for Other option -->
      <div
        v-if="
          option.style == 'LIST' &&
          option.key !== 'size' &&
          option.key !== 'color'
        "
        class="options-list"
      >
        <div class="select-list-option">
          <select
            v-model="listStyleOtherOption"
            class="select-list"
            @change="changeVarOther($event)"
          >
            <option
              v-for="(val, ii) in option.values"
              :key="ii"
              class="option-of-select"
              :value="{ index: i + 1, value: val._id }"
            >
              {{ val.value1 }}
            </option>
          </select>
        </div>
      </div>
      <!-- list style for Other option -->

      <!-- Checkbox style for color option -->
      <div
        v-if="
          (option.style == 'CHECK' || option.style == 'CHECK2') &&
          option.key == 'color'
        "
        class="list-option"
      >
        <ul
          class="list-checkbox-colors"
          :class="option.style == 'CHECK2' ? 'list-checkbox-colors2' : ''"
        >
          <li v-for="(value, vindex2) in option.values" :key="vindex2">
            <div class="content-check-style">
              <input
                :id="vindex2 + 'check'"
                :checked="
                  selected[`option${i + 1}`] &&
                  selected[`option${i + 1}`].value == value._id
                "
                class="check-style"
                style="cursor: pointer"
                name="color"
                type="checkbox"
                @click="
                  selectOneVarColor(
                    vindex2 + 'check',
                    option.values.length,
                    value._id,
                    i + 1
                  )
                "
              />
              <span class="space-between"></span>
              <label style="cursor: pointer" :for="vindex2 + 'check'">{{
                value.value1
              }}</label>
            </div>
          </li>
        </ul>
      </div>
      <!-- Checkbox style for color option -->

      <!-- Checkbox style for size option -->
      <div
        v-if="
          (option.style == 'CHECK' || option.style == 'CHECK2') &&
          option.key == 'size'
        "
        class="list-option"
      >
        <ul
          class="list-checkbox-colors"
          :class="option.style == 'CHECK2' ? 'list-checkbox-colors2' : ''"
        >
          <li v-for="(value, vindex2) in option.values" :key="vindex2">
            <div class="content-check-style">
              <input
                :id="vindex2 + 'checksize'"
                :checked="
                  selected[`option${i + 1}`] &&
                  selected[`option${i + 1}`].value == value._id
                "
                class="check-style"
                style="cursor: pointer"
                name="size"
                type="checkbox"
                @click="
                  selectOneVarSize(
                    vindex2 + 'checksize',
                    option.values.length,
                    value._id,
                    i + 1
                  )
                "
              />
              <span class="space-between"></span>
              <label style="cursor: pointer" :for="vindex2 + 'checksize'">{{
                value.value1
              }}</label>
            </div>
          </li>
        </ul>
      </div>
      <!-- Checkbox style for size option -->

      <!-- Checkbox style for size option -->
      <div
        v-if="
          (option.style == 'CHECK' || option.style == 'CHECK2') &&
          option.key !== 'size' &&
          option.key !== 'color'
        "
        class="list-option"
      >
        <ul
          class="list-checkbox-colors"
          :class="option.style == 'CHECK2' ? 'list-checkbox-colors2' : ''"
        >
          <li v-for="(value, vindex2) in option.values" :key="vindex2">
            <div class="content-check-style">
              <input
                :id="vindex2 + 'checkother'"
                :checked="
                  selected[`option${i + 1}`] &&
                  selected[`option${i + 1}`].value == value._id
                "
                class="check-style"
                style="cursor: pointer"
                name="size"
                type="checkbox"
                @click="
                  selectOneVarOther(
                    vindex2 + 'checkother',
                    option.values.length,
                    value._id,
                    i + 1
                  )
                "
              />
              <span class="space-between"></span>
              <label style="cursor: pointer" :for="vindex2 + 'checkother'">{{
                value.value1
              }}</label>
            </div>
          </li>
        </ul>
      </div>
      <!-- Checkbox style for size option -->

      <!-- Radiobtn style for color option -->
      <div
        v-if="
          (option.style == 'RADIO' || option.style == 'RADIO2') &&
          option.key == 'color'
        "
        class="list-option"
      >
        <ul
          class="list-radio"
          :class="option.style == 'RADIO2' ? 'list-radio2' : ''"
        >
          <li v-for="(value, vindex2) in option.values" :key="vindex2">
            <div class="content-radio-style">
              <input
                :id="vindex2 + 'radiocolor'"
                class="radio-style"
                style="cursor: pointer"
                name="color"
                :value="value._id"
                :checked="
                  selected[`option${i + 1}`] &&
                  selected[`option${i + 1}`].value == value._id
                "
                type="radio"
                @change="setVariant(i + 1, value._id)"
              />
              <span class="space-between"></span>
              <label style="cursor: pointer" :for="vindex2 + 'radiocolor'">{{
                value.value1
              }}</label>
            </div>
          </li>
        </ul>
      </div>
      <!-- Radiobtn style for color option -->

      <!-- Radiobtn style for size option -->
      <div
        v-if="
          (option.style == 'RADIO' || option.style == 'RADIO2') &&
          option.key == 'size'
        "
        class="list-option"
      >
        <ul
          class="list-radio"
          :class="option.style == 'RADIO2' ? 'list-radio2' : ''"
        >
          <li v-for="(value, vindex2) in option.values" :key="vindex2">
            <div class="content-radio-style">
              <input
                :id="vindex2 + 'radiosize'"
                class="radio-style"
                style="cursor: pointer"
                name="size"
                :value="value._id"
                :checked="
                  selected[`option${i + 1}`] &&
                  selected[`option${i + 1}`].value == value._id
                "
                type="radio"
                @change="setVariant(i + 1, value._id)"
              />
              <span class="space-between"></span>
              <label style="cursor: pointer" :for="vindex2 + 'radiosize'">{{
                value.value1
              }}</label>
            </div>
          </li>
        </ul>
      </div>
      <!-- Radiobtn style for size option -->

      <!-- Radiobtn style for other option -->
      <div
        v-if="
          (option.style == 'RADIO' || option.style == 'RADIO2') &&
          option.key !== 'size' &&
          option.key !== 'color'
        "
        class="list-option"
      >
        <ul
          class="list-radio"
          :class="option.style == 'RADIO2' ? 'list-radio2' : ''"
        >
          <li v-for="(value, vindex2) in option.values" :key="vindex2">
            <div class="content-radio-style">
              <input
                :id="vindex2 + 'radioother'"
                class="radio-style"
                style="cursor: pointer"
                name="other"
                :value="value._id"
                :checked="
                  selected[`option${i + 1}`] &&
                  selected[`option${i + 1}`].value == value._id
                "
                type="radio"
                @change="setVariant(i + 1, value._id)"
              />
              <span class="space-between"></span>
              <label style="cursor: pointer" :for="vindex2 + 'radioother'">{{
                value.value1
              }}</label>
            </div>
          </li>
        </ul>
      </div>
      <!-- Radiobtn style for other option -->

      <!-- image -->
      <div
        v-if="option.style == 'IMAGE' && loadImages"
        class="overflow-x-auto image-option-vr scroll-x"
      >
        <div
          v-for="(value, vindex3) in option.values"
          :key="vindex3"
          class="vr-image-style"
        >
          <div class="content-image-style">
            <span
              v-if="
                option.key !== 'color' &&
                value.images &&
                value.images.length == 0
              "
              :class="
                selected[`option${i + 1}`] &&
                selected[`option${i + 1}`].value == value._id
                  ? 'active'
                  : ''
              "
              class="size-style-image syles-image"
              @click="setVariant(i + 1, value._id)"
            >
              {{ value.value1 }}
            </span>
            <span
              v-if="
                option.key == 'color' &&
                value.images &&
                value.images.length == 0
              "
              :class="
                selected[`option${i + 1}`] &&
                selected[`option${i + 1}`].value == value._id
                  ? 'active'
                  : ''
              "
              :style="{ 'background-color': value.value2 }"
              class="color-style-image syles-image"
              @click="setVariant(i + 1, value._id)"
            >
            </span>
            <span
              v-if="value.images && value.images.length > 0"
              :class="
                selected[`option${i + 1}`] &&
                selected[`option${i + 1}`].value == value._id
                  ? 'active'
                  : ''
              "
              class="image-style-image syles-image"
              @click="setVariant(i + 1, value._id)"
            >
              <ImageLoader :src="value.images[0].src + `?width=70&height=70`" />
            </span>
          </div>
        </div>
      </div>
      <!-- image -->
    </div>
    <!--  -->
  </div>
  <!--  -->
</template>

<style scoped>
.mr-f-2 {
  margin-right: 0.5rem;
}

[dir='rtl'] .mr-f-2 {
  margin-left: 0.5rem;
}

.options {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.options .options-list {
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  border-radius: 9999px;
  background: #fff;
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid rgb(209, 213, 219);
  width: fit-content;
}

.options .size .option button {
  height: fit-content;
  width: fit-content;
}

.options .color .option button {
  border-radius: 50%;
  width: 25px;
  height: 25px;
  color: transparent;
  overflow: hidden;
  position: relative;
}

.options .color .option button.active {
  color: transparent;
  box-shadow:
    0 0 0px 1px white,
    0 0 0px 2.5px var(--secondary-color);
}

.options .option button.size-style {
  border-radius: 3px;
  background: #fff;
  padding: 5px 10px;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1) !important;
  color: #333333;
  width: auto;
  height: auto;
}

.options .option button.active {
  color: white;
  background-color: var(--secondary-color);
}

.options .option button.size-style.active {
  color: white;
  background-color: var(--secondary-color);
}

.options-list .select-list-option .select-list {
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
.options-list .select-list-option {
  position: relative;
  display: flex;
  width: 14em;
  height: 3em;
  border-radius: 0.25em;
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
  transition: 0.25s all ease;
  pointer-events: none;
}

/* Transition */
.options-list .select-list-option:hover::after {
  color: #f39c12;
}

.list-option {
  margin-bottom: 12px;
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
}

.list-option .options-key {
  margin-top: 8px;
  margin-right: 17px;
}

.list-radio2,
.list-checkbox-colors2 {
  flex-direction: column;
}

.list-checkbox-colors,
.list-radio {
  display: flex;
}

.list-checkbox-colors li,
.list-radio li {
  padding-right: 15px;
}

.check-style {
  width: 20px;
  height: 20px;
  /*margin-right: 7px;*/
}

.content-check-style {
  align-items: center;
  display: flex;
}

.radio-style {
  width: 20px;
  height: 20px;
  /*margin-right: 7px;*/
}

.content-radio-style {
  align-items: center;
  display: flex;
}

.list-checkbox-colors li,
.list-radio li {
  padding-right: 15px;
}

.check-style {
  width: 20px;
  height: 20px;
  /*margin-right: 7px;*/
}

.content-check-style {
  align-items: center;
  display: flex;
}

.option-of-select {
  direction: ltr;
}

.space-between {
  margin-right: 3px;
  margin-left: 3px;
}

.vr-image-style {
  margin-right: 5px;
}

.vr-image-style .content-image-style {
  width: 60px;
  height: 60px;
  position: relative;
}

.image-option-vr {
  display: flex;
}

.vr-image-style .content-image-style .syles-image {
  border: 1px solid rgb(209, 213, 219);
  overflow: hidden;
  border-radius: 6px;
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  cursor: pointer;
  margin-right: 5px;
  width: 60px;
  height: 60px;
}

.vr-image-style .content-image-style .syles-image.active {
  border: 2px solid var(--secondary-color);
  border-radius: 6px;
  overflow: hidden;
}

.vr-image-style .content-image-style .size-style-image {
  background-color: #fff;
  text-align: center;
  padding-top: 17px;
  padding-bottom: 13px;
}

.vr-image-style .content-image-style .color-style-image {
  background-color: #e6199b;
  text-align: center;
  padding-top: 17px;
  padding-bottom: 13px;
}

.vr-image-style .content-image-style .image-style-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
