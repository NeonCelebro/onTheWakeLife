export default (
  mail: string,
  amount: number,
  balancePoints: number,
  firstName: string,
  lastName: string,
): string => {
  return `
  <h2>Company name: GoClass OÜ</h2>
  <p>Registry Code: 16147538</p>
  <p>VAT number: EE102336944</p>
  <p>IBAN:</p>
  <p>Address: Lõõtsa tn 5-- 11 Lasnamäe district, Tallinn Harju county 11415</p>
  
  <h2>Bill To: </h2>    
  <p>Individual's name: ${firstName} ${lastName} </p>    
  <p>Individual's address: none</p>    
  <p>Individual's email: ${mail}</p>    

  <h2>Transaction: </h2>    
  <p>Total Amount: ${amount / 100}</p>    
  <p>Price: ${Math.ceil(amount / 100 / balancePoints)}</p>    
  <p>Quantity:  ${balancePoints}</p>`;
};
