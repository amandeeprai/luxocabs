import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fqa',
  templateUrl: './fqa.component.html',
  styleUrls: ['./fqa.component.scss']
})
export class FqaComponent implements OnInit {
  public itemsList:Object[] = [
    {
        title: 'Q: How many years has LuxoCabs been in business?',
        description: 'LuxoCabs has been in business for more than ten years.'
    },
    {
      title: 'Q: Is smoking allowed in the limousines?' ,
      description: 'No, sorry, smoking is never allowed in our vehicles. Our drivers do not smoke in the vehicles either. We want our vehicles always to smell their freshest.'
  },
  {
    title: 'Q: How does LuxoCabss give the best prices in the Melbourne area and still have the newest cars?',
    description: 'We offer the best prices because we purchase our vehicles in bulk. We can do that because of our success.'
},
{
  title: 'Q: How much time do you need for me to make my reservation?',
  description: 'LuxoCabs is based on a first come, first serve type basis. As soon as you know the date, please DON`T WAIT! Book your appointment as quickly as possible. This will give you great peace of mind.'
},
{
  title: 'Q: How will I recognize my driver when he/she arrives with the limo?',
  description: 'Your driver will have - most importantly – a pleasant, friendly smile. You will notice that the driver will be wearing a tie and a dark suit. Always professional looking and be well-groomed.'
},
{
  title: 'Q: When does the rental start?',
  description: 'Your rental starts when the limo arrives to pick you up. For example, if you have scheduled a 4-hour limo rental, from 7:00 PM to 11:00 PM, the limousine will be there at 7:00 PM ready to pick you up. The rental will continue until 11:00 PM at your desired drop-off location.'
},
{
  title: 'Q: What happens if we need to go over our agreed time?',
  description: 'If you suspect you need more time, please call our office immediately. If the vehicle is not booked, you are welcome to extend your rental time. The fee should be paid to the driver in cash; please note: the driver cannot accept credit card payments during the trip.'
},
{
  title: 'Q: What is your cancellation policy?',
  description: 'Once a trip is booked and money has been deposited, a credit certificate valid for postponing your trip will be issued. This certificate is good for up to 6 months.'
},
{
  title: 'Q: Do you provide alcohol in the cab?',
  description: 'No, we do not provide alcohol, but you are free to bring your own, provided everyone in the party is over 21 years of age. Choose small ready-to-use bottles of beer and wines, rather than large containers that require pouring and mixing.'
},
{
  title: 'Q: Are your vehicles insured?',
  description: 'Yes, we are fully licensed and insured.'
},    
{
  title: 'Q: We booked for ten people, but have invited five more to join us. Is that OK?',
  description: 'Every vehicle has capacity limitations that we legally cannot go over for safety reasons. Please check with our office as soon as possible. We may need to upgrade, depending on the current situation. Extra fees will apply.'
},
{
  title: 'Q: Is the rental by the hour?',
  description: 'Yes, the limos are rented by the hour; fees are determined by the size and style of the limo. We require a 2-hour minimum for rental unless specified. Call for a taxi estimate cost Melbourne. Your Taxi fare estimator Melbourne will happily help you.'
},
{
  title: 'Q: What if I lose something?',
  description: 'No worries! Just give us a call asap. Our cars are cleaned and carefully inspected after every rental. Our lost and found items are set aside in the lost/found bin. We`ll be happy to make arrangements to meet with you to return your lost items.'
},
{
  title: 'Q: Who should I call once rental begins?',
  description: 'When the driver arrives, he or she will give you a business card with the office listed as well as the driver`s phone number Melbourne taxi phone number. Please keep the card handy during the rental and call your driver when you`re ready to be picked up.'
},
{
  title: 'Q: Will the limo wait for us outside?',
  description: 'Once you`re dropped off, our driver will wait nearby. When you`re ready to go, please give the driver a 5-minute wait time to get there. Please note: some locations do not allow for vehicles to get too close. The driver might have to go around the block or something. Please wait for your driver outside the nightclub or restaurant.'
},
{
  title: 'Q: Can we bring our own music?',
  description: 'Yes, of course! At a minimum, all of our vehicles are equipped with CD players, and some even have iPod hookups! Bring your favorite tunes to enhance your limousine ride experience.'
},
{
  title: 'Q: Will my driver be fun?',
  description: 'While our drivers are professional chauffeurs and not professional entertainers, they will be pleasant. However, their primary responsibility is to transport you from one place to another safely. Customers have varied tastes and needs, and as such, must maintain a professional attitude at all times. We instruct our drivers to be courteous at all times and responsive to all our customers` needs.'
},
{
  title: 'Q: Can we bring food?',
  description: 'No, sorry. Food is not permitted in the vehicles. Food leaves stains and often smells that are nearly impossible to remove. As our customers have varied tastes and preferences, we must be careful to maintain clean vehicles free of odor and unsightly stains at all times. If you wish to stop for a bite to eat at a restaurant or café, please notify your driver.'
}
]
  constructor() { }

  ngOnInit() {
  }

}
