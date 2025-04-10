"use client";
import { useMachine } from "@xstate/react";
import { v4 as uuidv4 } from "uuid";

import Button from "./ui/Button";
import Input from "./ui/Input";
import { categoryMachine } from "../../machines/categoryMachine";
import { TCategory } from "../../types/categoryType";
import CategoryItemList from "./ui/CategoryItemList";

const categories = new Set<TCategory>([]);

export default function Category() {
  const [state, send] = useMachine(categoryMachine, { 
    services: {
      loadCategories: async () => {
        return Array.from(categories);
      },
      saveCategory: async (context) => {
        const newCategory: TCategory = {
          id: uuidv4(),
          title: context.titleFormInput,
        }
        console.log({newCategory});
        categories.add(newCategory);
      },
      deleteCategory: async (context, event) => {
        categories.delete(event.category);
      },
    },
  });

  return (
    <>
      <p>STATE VALUE</p>
      <p>{JSON.stringify(state.value)}</p>
      <p>STATE CONTEXT</p>
      <p>{JSON.stringify(state.context)}</p>
      <div className="w-full">
        {(state.matches("categoriesLoaded") || state.matches("creatingNewCategory.showingFormInput")) && (
          <CategoryItemList
            categoryList={state.context.categories}
            onDelete={(category) => {
              send({
                type: "delete",
                category,
              });
            }}
            onEdit={(category) => {
              console.log("Edit", category);
            }}
            onComplete={() => {
              console.log("Complete");
            }}/>
        )}
        {state.matches("categoriesLoaded") && (
          <Button
            onClick={() => {
              send({
                type: "createNewCategory",
              });
            }}
          >
            Create new
          </Button>
        )}
        {state.matches("deletingCategoryErrored") && (
          <>
            <p>Something went wrong: {state.context.errorMessage}</p>
            <Button
              onClick={() => {
                send({
                  type: "speedUp",
                });
              }}
            >
              Go back to list
            </Button>
          </>
        )}
        {state.matches("creatingNewCategory.showingFormInput") && (
          <form
            className="flex flex-row gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              send({
                type: "submit",
              });
            }}
          >
            <Input
              type="text"
              placeholder="Title"
              required
              onChange={(e) => {
                send({
                  type: "titleInputChanged",
                  value: e.target.value,
                });
              }}
            />
            <Input
              type="text"
              required
              placeholder="Category"
              onChange={(e) => {
                send({
                  type: "categoryInputChanged",
                  value: e.target.value,
                });
              }}
            />
            <Input
              type="date"
              placeholder="Select Target Date"
              required
              onChange={(e) => {
                console.log("e.value", e.target.value);
                send({
                  type: "targetDateInputChanged",
                  value: e.target.value,
                });
              }}
            />
            <Button
              disabled={state.context.titleFormInput === "" }
              className="disabled:opacity-50"
              type="submit"
              onClick={() => {
                send({
                  type: "submit",
                });
              }}
            >
              Create
            </Button>
            <Button
              type="button"
              onClick={() => {
                send({
                  type: "cancel",
                });
              }}
            >
              Cancel
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
