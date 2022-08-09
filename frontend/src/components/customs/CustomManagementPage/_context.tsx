import { getErrorMessage } from "utils/catchError";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

export const managementContext = createContext<any>(null);

export const useManagementContext = () => useContext(managementContext);

const ManagementContextProvider = ({ children }: { children: ReactNode }) => {
  const contextName = "Custom";
  const [view, setView] = useState<"table" | "grid">("table");
  const [searchName, setSearchName] = useState("");
  const [orderBy, setOrderBy] = useState("created_at");
  const [orderType, setOrderType] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [currentSelect, setCurrentSelect] = useState(null);

  const [isCreating, setIsCreating] = useState(false);
  const [createModalLoading, setCreateModalLoading] = useState(true);

  const [currentEdit, setCurrentEdit] = useState<any>(null);
  const [editModalLoading, setEditModalLoading] = useState(true);

  // Options ==========================================================

  const displayOptions = [
    { label: "Dessert (100g serving)", value: "name" },
    { label: "Calories", value: "calories" },
    { label: "Fat (g)", value: "fat" },
    { label: "Carbs (g)", value: "carbs" },
    { label: "Protein (g)", value: "protein" },
  ];

  const orderByOptions = [
    {
      label: "Created At",
      value: "created_at",
    },
  ];

  const [productOptions, setProductOptions] = useState([
    { label: "Product 1", value: "product_1" },
    { label: "Product 2", value: "product_2" },
    { label: "Product 3", value: "product_3" },
    { label: "Product 4", value: "product_4" },
  ]);
  const [categoryOptions, setCategoryOptions] = useState([
    { label: "Category 1", value: "category_1" },
    { label: "Category 2", value: "category_2" },
    { label: "Category 3", value: "category_3" },
    { label: "Category 4", value: "category_4" },
  ]);

  // Create Modal =======================================================

  const createModalInitialValues = {
    input1: {
      label: "Input 1",
      value: "",
      optional: true,
    },
    input2: {
      label: "Input 2",
      value: [],
      isMultipleSelect: true,
      options: productOptions,
    },
    input3: {
      label: "Input 3",
      value: undefined,
      isMultipleSelect: false,
      options: categoryOptions,
    },
  };

  const createModalSubmitHandler = async (values: any) => await create(values);

  // Edit Modal =======================================================

  const editModalInitialValues = {
    input1: {
      label: "Input 1",
      value: "",
      optional: true,
    },
    input2: {
      label: "Input 2",
      value: [],
      isMultipleSelect: true,
      options: productOptions,
    },
    input3: {
      label: "Input 3",
      value: undefined,
      isMultipleSelect: false,
      options: categoryOptions,
    },
  };

  const editModalSubmitHandler = async (values: any) => await update(values);
  // Extra Add-On =====================================================

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
  ];

  // Others =============================================================

  const refresh = async () => {
    await find();
  };
  const find = async () => {
    setLoading(true);
    setData(null);
    try {
      console.log("find");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(rows);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
    setLoading(false);
  };
  const findOne = async (data: any) => {
    setLoading(true);
    try {
      console.log("find one:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
    setLoading(false);
  };
  const create = async (data: any) => {
    setLoading(true);
    try {
      console.log("create:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsCreating(false);
      toast.success("Saved");
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
    setLoading(false);
  };
  const update = async (data: any) => {
    setLoading(true);
    try {
      console.log("update:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentEdit(null);
      toast.success("Saved");
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
    setLoading(false);
  };
  const remove = async (data: any) => {
    setLoading(true);
    try {
      console.log("remove:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Deleted");
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
    setLoading(false);
  };

  // Triggers =============================================================

  useEffect(() => {
    refresh();
  }, [searchName, orderBy, orderType, currentPage]);

  // Context Value ========================================================

  const contextValue = {
    view,
    setView,
    searchName,
    setSearchName,
    orderBy,
    setOrderBy,
    orderType,
    setOrderType,
    currentPage,
    setCurrentPage,
    totalPage,
    setTotalPage,
    refresh,
    find,
    findOne,
    create,
    update,
    remove,
    data,
    setData,
    loading,
    setLoading,
    isCreating,
    setIsCreating,
    currentEdit,
    setCurrentEdit,
    displayOptions,
    contextName,
    orderByOptions,
    createModalInitialValues,
    productOptions,
    setProductOptions,
    createModalLoading,
    setCreateModalLoading,
    editModalLoading,
    setEditModalLoading,
    categoryOptions,
    setCategoryOptions,
    createModalSubmitHandler,
    editModalInitialValues,
    editModalSubmitHandler,
    currentSelect,
    setCurrentSelect,
  };

  // JSX Element ========================================================

  return (
    <managementContext.Provider value={contextValue}>
      {children}
    </managementContext.Provider>
  );
};

export default ManagementContextProvider;
