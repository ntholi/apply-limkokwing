'use client';
import React from 'react';

import {
  ImagePicker,
  FieldView,
  ResourcePage,
  DetailsView,
  CreateViewProps,
  CreateView,
  TextField,
  EditViewProps,
  EditView,
} from '@/app/(admin)/admin-core';
import { Image } from '@mantine/core';
import { categoryRepository } from './repository';
import { Category } from './category';
import NextImage from 'next/image';

export default function CategoryPage() {
  return (
    <ResourcePage
      resourceLabel='Category'
      repository={categoryRepository}
      create={CategoryCreate}
      edit={CategoryEdit}
      details={CategoryDetails}
      navLinkProps={(it) => ({ label: it.name })}
    ></ResourcePage>
  );
}

function CategoryDetails({ item }: { item: Category }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={item.name} />
      <FieldView label={item.description} value='Description' />
      <div>
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            component={NextImage}
            height={400}
            width={400}
            radius='md'
            h={200}
            w='auto'
            fit='contain'
          />
        )}
      </div>
    </DetailsView>
  );
}

function CategoryCreate(props: CreateViewProps<Category>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
      <TextField name='description' />
      <ImagePicker name='image' folder='categories' />
    </CreateView>
  );
}

function CategoryEdit(props: EditViewProps<Category>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
      <TextField name='description' />
      <ImagePicker name='image' folder='categories' />
    </EditView>
  );
}
