<script setup>
import SectionHeading from '../components/SectionHeading.vue'
import PricingTable from '../components/PricingTable.vue'
import FAQAccordion from '../components/FAQAccordion.vue'

const plans = [
  {
    type: 'Starter',
    name: 'Basic',
    price: '$19/mo',
    summary: 'A lean package for new websites and simple launches.',
    features: ['One landing page', 'Email support', 'Basic SEO setup'],
  },
  {
    type: 'Growth',
    name: 'Standard',
    price: '$49/mo',
    summary: 'A balanced plan for growing companies and recurring campaigns.',
    recommended: true,
    features: ['Up to 5 pages', 'Analytics dashboard', 'Priority support'],
  },
  {
    type: 'Scale',
    name: 'Premium',
    price: '$99/mo',
    summary: 'Full service for established brands and multi-channel launches.',
    features: [
      'Custom integrations',
      'Dedicated support',
      'Performance optimization',
    ],
  },
]

// const faqs = [
//   {
//     question: 'Can I change the pricing labels to hourly or project-based?',
//     answer:
//       'Yes. These cards are intentionally flexible and can be adapted to hourly, fixed-fee, or retainer pricing models.',
//   },
//   {
//     question: 'Is the plan information easy to update?',
//     answer:
//       'Absolutely. Just swap out the plan objects here or drive them from a content file for more advanced setups.',
//   },
// ]
</script>

<template>
  <div class="py-16 md:py-24">
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8"
      :style="{ maxWidth: $theme.layout.maxWidth }"
    >
      <SectionHeading
        eyebrow="Pricing"
        title="Transparent packages for every budget"
        description="Create clear offers for agencies, product teams, freelancers, or local businesses with adaptable pricing cards."
      />

      <div class="mt-16">
        <PricingTable :plans="plans" />
      </div>

      <div class="mt-20">
        <SectionHeading
          title="Frequently asked questions"
          description="Answer common objections up front and make it easier for prospects to choose the right plan."
        />
        <div class="mt-10">
          <FAQAccordion :faqs="$config.faqs" />
        </div>
      </div>
    </div>
  </div>
</template>
