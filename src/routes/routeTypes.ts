export interface Products {
  id: number;
  product_name: string;
  product_details: string;
  product_price: number;
  activation_status: boolean;
  created_at?: Date;
  updated_at?: Date;
  categories?: Categories[];
  attributes?: AttributeValues[];
}

export interface Categories {
  id: number;
  category_name: string;
  activation_status: boolean;
  root_id?: number;
  created_at?: Date;
  updated_at?: Date;
  products?: Products[];
}

export interface Attributes {
  id: number;
  attribute_name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface AttributeValues {
  id: number;
  attribute_value: string;
  attribute_id: number;
  created_at?: Date;
  updated_at?: Date;
  attribute?: Attributes;
}