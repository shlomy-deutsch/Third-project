
class ProductModel {
  static push(p: string) {
    throw new Error("Method not implemented.");
  }
  public Vecation_ID: number | undefined | string;
  public Name: string  ="";
  public Place: string = "";
  public Price: number = 0;
  public Image_Name: number | undefined;
  public Start_Date: Date | undefined| any;
  public End_Date: Date | undefined| any;
  public img : FileList | undefined;
  public Folows : number | undefined
  
 


  public static convertToFormData(product: ProductModel): FormData {
    const myFormData = new FormData();
    myFormData.append("Name", product.Name);
    myFormData.append("Price", product.Price.toString());
    myFormData.append("Place", product.Place.toString());
    myFormData.append("Start_Date", product.Start_Date as unknown as Blob);
    myFormData.append("End_Date", product.End_Date as unknown as Blob);
    myFormData.append("img", product.img?.item(0) as Blob);
    return myFormData;
  }
}

export default ProductModel;
