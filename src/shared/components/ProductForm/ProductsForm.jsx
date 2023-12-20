import CustomInput from "../CustomInput/CustomInput";

const ProductsForm = ({ children, formData, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <CustomInput
        label="Product Name"
        type="text"
        placeholder="Double Sofa"
        id="title"
        value={formData.title}
        onChange={onChange}
        required
      />
      <CustomInput
        label="Short Description"
        type="text"
        placeholder="Lorem...."
        id="shortDescription"
        value={formData.shortDescription}
        onChange={onChange}
        required
      />
      <CustomInput
        label="Description"
        type="text"
        placeholder="Lorem...."
        id="description"
        value={formData.description}
        onChange={onChange}
        required
      />

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <CustomInput
          label="Price"
          type="text"
          placeholder="$100"
          id="price"
          containerClass="w-30"
          value={formData.price}
          onChange={onChange}
          required
        />
        <CustomInput
          label="Count In Stock"
          type="text"
          placeholder="100"
          id="inStock"
          containerClass="w-30"
          value={formData.inStock}
          onChange={onChange}
          required
        />

        <div className="form__group w-30">
          <label className="mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={onChange}
            required
          >
            <option value="">Choose Product Category</option>
            <option value="chair">Chair</option>
            <option value="sofa">Sofa</option>
            <option value="watch">Watch</option>
            <option value="wireless">Wireless</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
      </div>

      <div>
        <CustomInput
          label="Prodcut Image"
          type="file"
          id="image"
          onChange={onChange}
        />
      </div>

      {children}
    </form>
  );
};

export default ProductsForm;
