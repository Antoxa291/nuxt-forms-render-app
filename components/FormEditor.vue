<template>
  <div>
    <v-menu offset-y>
      <template #activator="{ on }">
        <v-btn v-on="on">Add field</v-btn>
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

    <v-form ref="form">
      <v-list>
        <v-list-item
          v-for="(field, index) in fields"
          :key="field.id"
          v-list-item-draggable
        >
          <v-list-item-action>
            <v-icon>mdi-drag</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <template v-if="field.type === 'header'">
              <v-text-field
                v-model="field.value"
                label="Header"
                :rules="field.required ? [(v) => !!v || 'Field is required'] : []"
              />
            </template>
            <template v-else-if="field.type === 'number'">
              <v-text-field
                v-model="field.value"
                label="Number field"
                type="number"
                :rules="field.required ? [(v) => !!v || 'Field is required'] : []"
              />
            </template>
            <template v-else-if="field.type === 'input'">
              <v-text-field
                v-model="field.value"
                label="Input field"
                :rules="field.required ? [(v) => !!v || 'Field is required'] : []"
              />
            </template>
            <template v-else-if="field.type === 'checkbox'">
              <v-checkbox v-model="field.value" label="Checkbox field" />
            </template>
            <template v-else> Type not supported </template>
            <template v-if="field.actions">
              <v-btn @click="deleteField(index)">Delete</v-btn>
            </template>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div v-if="fields.length">
        <h3>Serialized Data into a base64 string</h3>
        <v-textarea v-if="fields.length" v-model="serializedData" readonly></v-textarea>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Buffer } from "buffer";
import { defineComponent } from "vue";

interface Field {
  type: "header" | "number" | "input" | "checkbox";
  id: string;
  name: string;
  default: any;
  required: boolean;
  actions?: {
    reorder: boolean;
    delete: boolean;
  };
  value: any;
}

export default defineComponent({
  data() {
    return {
      fields: [] as Field[],
      fieldTypes: ["Header", "Number", "Input", "Checkbox"] as const,
    };
  },
  computed: {
    serializedData(): string {
      return Buffer.from(JSON.stringify(this.fields)).toString("base64");
    },
  },

  methods: {
    addField(fieldType: typeof this.fieldTypes[number]) {
      const field: Field = {
        type: fieldType.toLowerCase() as Field["type"],
        id: "",
        name: "",
        default: "",
        required: false,
        actions: {
          reorder: true,
          delete: true,
        },
        value: "",
      };
      this.fields.push(field);
    },

    deleteField(index: number) {
      this.fields.splice(index, 1);
    },
  },
});
</script>
