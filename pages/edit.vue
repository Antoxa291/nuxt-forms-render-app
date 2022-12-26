<template>
  <div>
    <v-menu offset-y >
      <template #activator="{ on }">
        <v-btn class="mb-4 addField" v-on="on">Add field</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="fieldType in fieldTypes"
          :key="fieldType"
          @click="addField(fieldType)"
        >
          {{ fieldType }}
        </v-list-item>
      </v-list>
    </v-menu>

    <v-form v-if="fields.length" ref="form">
      <v-list
        class="mb-4"
      >
        <draggable v-model="fields" ghost-class="ghost" handle=".handle">
          <transition-group type="transition" name="flip-list">
            <v-list-item
              v-for="(field, index) in fields"
              :id="field.id"
              :key="field.id"
            >
              <v-list-item-content class="item-wrapper">
                <template v-if="field.type === 'divider'">
                  <v-text-field
                    v-model="field.value"
                    label="Divider"
                    :rules="field.required ? [(v) => !!v || 'Field is required'] : []"
                    draggable="false"
                  />
                </template>
                <template v-else-if="field.type === 'number'">
                  <v-text-field
                    v-model="field.name"
                    label="Field name"
                  />
                  <v-text-field
                    v-model="field.default"
                    label="Default value"
                    type="number"
                  />
                </template>
                <template v-else-if="field.type === 'input'">
                  <v-text-field
                    v-model="field.name"
                    label="Field name"
                  />
                  <v-text-field
                    v-model="field.default"
                    label="Default value"
                  />
                </template>
                <template v-else-if="field.type === 'checkbox'">
                  <v-text-field
                    v-model="field.name"
                    label="Field name"
                  />
                  <v-checkbox v-model="field.default" label="Checked by default" />
                </template>
                <v-checkbox v-model="field.required" label="Required" />
                <v-btn class="deleteButton" @click="deleteField(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-content>
              <v-list-item-action >
                <v-btn class="handle">
                  <v-icon>mdi-drag</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </transition-group>
        </draggable>
      </v-list>
      <div v-if="fields.length">
        <h3>Serialized Data into a base64 string</h3>
        <v-textarea v-if="fields.length" id="textInput" v-model="serializedData" readonly></v-textarea>
        <v-btn class="copyButton" @click="copyToClipboard()">Copy results to clipboard:</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Buffer } from "buffer";
import Vue from "vue";
import draggable from 'vuedraggable'

import { Field } from "@/types";

export default Vue.extend({
  name: "EditPage",
  components: { draggable },

  data() {
    return {
      fields: [] as Field[],
      fieldTypes: ["Divider", "Number", "Input", "Checkbox"] as const,
      drag: false as boolean
    };
  },

  computed: {
    serializedData(): string {

      return Buffer.from(JSON.stringify(this.fields)).toString("base64");
    },
  },

  methods: {
    addField(fieldType: typeof this.fieldTypes[number]): void {
      const field: Field = {
        type: fieldType.toLowerCase() as Field["type"],
        id: `parameter_${this.fields.length + 1}`,
        name: fieldType,
        default: "",
        required: false,
        value: "",
      };

      this.fields.push(field);
    },

    deleteField(index: number): void {
      this.fields.splice(index, 1);
    },

    copyToClipboard() {
      let element = document.getElementById('textInput');

      (element as HTMLInputElement).select();
      document.execCommand('copy');
      element = null;
    }
  }
})
</script>

<style scoped>
  .item-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1 0 80%;
    justify-content: space-around
  }
  .item-wrapper .v-input {
    padding: 0 8px;
    max-width: 100%;
  }
  .item-wrapper .v-btn {
    flex: 0;
    padding: 0;
    min-width: 36px;
    cursor: pointer;
  }
  .handle:hover {
    cursor: move;
  }
</style>
