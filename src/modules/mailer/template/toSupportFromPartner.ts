import { PartnerEntity } from 'src/modules/partners/entities/partner.entity';

export default (partner: PartnerEntity, message: string): string => {
  return `
  <p>Company Name: "${partner.companyName}"</p>
  <p>Name: "${partner.name}"</p>
  <p>Phone: "${partner.phone}"</p>
  <p>Email: "${partner.email}"</p>
  <p>Id: "${partner.id}"</p>
  <p>Message: "${message}"</p>`;
};
