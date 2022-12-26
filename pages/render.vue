<template>
  <div>
    <h3>Please enter a serialized data string below:</h3>
    <v-textarea v-model.lazy="inputString"></v-textarea>
    <div class="actions-wrapper">
      <div>
        <v-btn class="ma-2 pasteFromClipboard" @click="pasteFromClipboard()">Paste from clipboard</v-btn>
      </div>
      <div v-if="inputString.length">
        <v-btn class="ma-2 showButton" @click="decodeAndRender()">Show Form</v-btn>
      </div>
      <div v-if="inputString.length">
        <v-btn class="ma-2 clearForm" @click="clearForm()">Clear</v-btn>
      </div>
    </div>
    <div id="output"></div>
    <v-form ref="form">
      <div v-for="field in fields" :key="field.id">
        <template v-if="field.type === 'divider'">
          <h2 :id="field.id" :name='field.id'>{{ field.value || field.name }}</h2>
        </template>
        <template v-else-if="field.type === 'number'">
          <v-text-field
            :id="field.id"
            v-model="field.default"
            :name='field.id'
            :label="field.name"
            type="number"
            :rules="field.required ? [(v) => !!v || 'Field is required'] : []"
          />
        </template>
        <template v-else-if="field.type === 'input'">
          <v-text-field
            :id="field.id"
            v-model="field.default"
            :name='field.id'
            :label="field.name"
            :rules="field.required ? [(v) => !!v || 'Field is required'] : []"
          />
        </template>
        <template v-else-if="field.type === 'checkbox'">
          <v-checkbox
            :id="field.id"
            v-model="field.default"
            :name='field.id'
            :label="field.value || field.name"
            :rules="field.required ? [(v) => !!v || 'Field is required'] : []"/>
        </template>
      </div>
    </v-form>

  </div>
</template>

<script lang="ts">
import { Buffer } from 'buffer'
import Vue from "vue";
import { Field } from "@/types";

export default Vue.extend({
  name: "RenderPage",
  data(){
    return {
      inputString: '' as string,
      serializedData: '' as string,
      isError: false as boolean
    }
  },

  computed: {
    fields(): Field[] {
      try {
        return JSON.parse(this.serializedData)
      } catch (error) {
        return  []
      }
    }
  },

  methods: {
    async pasteFromClipboard() {
      const pasteText = await navigator.clipboard.readText();;
      this.inputString = pasteText || '';
    },

    decodeAndRender() {
      try {
        const buffer = Buffer.from(this.inputString, "base64");
        const decodedData: string = buffer.toString("utf8");
        this.serializedData = decodedData;
      } catch (error) {
      }
    },

    clearForm() {
      this.inputString = '';
      this.serializedData = '';
      this.isError = false;
    }
  }
})
</script>

<style scoped>
  .actions-wrapper {
    display: flex;
    flex-direction: row;

  }
</style>
