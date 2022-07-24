import { ClassEntity } from '../../classes/entities/class.entity';
import { UserEntity } from '../../users/entities/user.entity';
export default (user: Partial<UserEntity>, amount: number, classExamplar: ClassEntity): any => {
  let subTotal = 0;
  let vat = 0;
  let vatPercent = 0;
  // const vatPercent = parseInt(classExamplar.studio.VAT[0] + classExamplar.studio.VAT[1]);
  if (classExamplar.studio.VAT[0] == '2') {
    subTotal = Math.round((amount / 120) * 100);
    vat = amount - subTotal;
    vatPercent = 20;
  } else {
    subTotal = amount;
  }
  return `
  <h2>Company name: ${classExamplar.studio.name}</h2>
  <p>Registry Code: ${classExamplar.studio.legalInfo.registryCode}</p>
  <p>VAT number: ${classExamplar.studio.legalInfo.vatNumber}</p>
  <p>IBAN:</p>
  <p>Address: ${classExamplar.studio.legalInfo.address}</p>
  
  <h2>Bill To: </h2>    
  <p>Individual's name: ${user.firstName} ${user.lastName} </p>    
  <p>Individual's address: none</p>    
  <p>Individual's email: ${user.email}</p>    

  <h2>Booking: </h2>    
  <p>Description: ${classExamplar.nameOnEnglish}</p>   
  <p>VAT: ${vat / 100} (${vatPercent}%)</p>  
  <p>Subtotal: ${subTotal / 100}</p>        
  <p>Total: ${amount / 100}</p>    
  <p>Quantity:  1</p>`;
};
