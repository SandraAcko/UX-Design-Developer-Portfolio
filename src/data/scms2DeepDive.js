// Real images live in /public (pass `file`); omit `file` to show a numbered placeholder.
const pub = (file) => `${import.meta.env.BASE_URL}${file}`;
const img = (caption, opts = {}) => ({
  type: "image",
  caption,
  alt: opts.alt || caption,
  src: opts.file ? pub(`scms2Images/${opts.file}`) : "",
  ratio: opts.ratio || "wide", // placeholder shape: wide | square | tall | banner
  size: opts.size || "full", // full | medium
});
// layout: pair | trio | feature (first image tall on the left, rest stacked) | wide-narrow
// ratio: CSS aspect-ratio of each framed image, e.g. "4 / 5" (ignored by feature and wide-narrow)
const gallery = (layout, ratio, ...images) => ({ type: "gallery", layout, ratio, images });
const compare = (before, after, caption) => ({
  type: "compare",
  before: { ...before, src: pub(`scms2Images/${before.file}`) },
  after: { ...after, src: pub(after.file) },
  caption,
});
const p = (text) => ({ type: "p", text });
const list = (...items) => ({ type: "list", items });
const sub = (label, title) => ({ type: "sub", label, title });
const callout = (text) => ({ type: "callout", text });

export const scms2DeepDive = {
  facts: [
    { label: "Role", value: "UX/UI design, prototyping, interaction design and frontend implementation" },
    { label: "Tools", value: "Figma, Vue.js, Tailwind CSS, PrimeVue" },
    { label: "Project type", value: "UX/UI design and frontend development" },
    { label: "Status", value: "Frontend developed; awaiting initial site-manager testing and rollout" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        p("SCMS2 is a major project to modernise an existing system used across factories, finance, production, reporting and logistics. The original system was built using Drupal 7, and the migration to a new database structure created an opportunity to improve performance while moving towards a more modern, flexible user interface."),
        img("The original SCMS interface, built on Drupal 7", { file: "2-SCMSOldSystem.jpg", size: "medium" }),
        p("One of the first features I worked on was a new customer call-off portal. This would allow the client's customers, particularly site managers, to request deliveries themselves rather than needing to contact the client directly. The experience needed to be intuitive, accessible and mobile-friendly, while supporting a process that could become quite complex depending on the products and information involved."),
        p("My work began with exploring the overall portal journey, from login through to successfully requesting a delivery. As requirements developed, I created several iterations of the design, incorporating client and team feedback before agreeing on a final direction."),
        p("I later revisited the Track Call-offs page in detail when the client identified additional requirements around delivery grouping, site information and status tracking. This became a more focused redesign in which I explored different ways to communicate complex information clearly without overwhelming users."),
        p("Since the design work, I have also developed much of the frontend into a working web application using Vue.js and Tailwind CSS."),
      ],
    },
    {
      id: "challenge",
      title: "The challenge",
      blocks: [
        p("The existing system had established processes that worked for internal staff, but these were not necessarily suitable for external customers who might not understand the company's internal terminology or workflows."),
        p("The new portal needed to make requesting deliveries straightforward while accommodating a wide range of real-world requirements. As the project progressed, it became clear that a simple form-based journey would not be enough. Different products required different information, some call-offs needed to be managed together, and users also needed a clear way to understand delivery progress."),
        p("Rather than designing everything at once, I used an iterative approach. This allowed me to explore different visual directions, respond to emerging requirements and test the structure of the experience with the client and development team before committing to a final design."),
      ],
    },
    {
      id: "portal",
      number: "01",
      title: "Exploring the portal experience",
      blocks: [
        sub("V1", "Low-fidelity concepts"),
        p("I started with a simple flow and several login-page concepts to establish the visual direction the client wanted to pursue."),
        p("These concepts explored different approaches, including actual photography from the factory, sleek minimalist layouts using the brand colours, and other visual treatments. At this stage, the full requirements had not yet been established, so the aim was to explore the look and feel of the portal and provide a starting point for discussion."),
        gallery("pair", "4 / 5",
          img("V1 low-fidelity flow", { file: "3-V1LowFidelityFlow.png" }),
          img("V1 login page design concepts", { file: "4-V1DesignConcepts.png" }),
        ),
        p("Keeping the initial designs simple meant I could explore different directions without investing too much time in details that might need to change."),

        sub("V2", "Developing the user journey"),
        p("As more requirements emerged, I developed a more detailed flow, taking inspiration from an existing section of the old system that already worked well for staff when processing call-offs internally."),
        p("However, I did not want to simply reproduce the existing interface. The new portal would be used by external site managers, who might not have the same background knowledge as internal staff. I therefore looked at how the established process could be simplified, reducing unnecessary friction and the need to understand internal workflows."),
        gallery("pair", "4 / 5",
          img("V2 detailed user flow", { file: "5-V2.png" }),
          img("V2 animated components", { file: "6-V2Components.png" }),
        ),
        p("I also introduced a few animated components to demonstrate how the flow would work in practice. Because the requirements were still evolving, I focused on including enough interaction to communicate the intended experience without spending excessive time polishing details that might change."),

        sub("V3", "Exploring a shopping cart"),
        p("The client specifically requested a shopping cart feature because they wanted placing a call-off to feel more like making a purchase."),
        img("V3 shopping cart flow", { file: "7-V3ShoppingCart.png" }),
        p("I incorporated this into V3, allowing users to access their basket throughout the journey, move backwards when needed and add more than one order at a time. This would offer more flexibility than the existing system, where users could not currently call off multiple orders in the same way."),
        gallery("pair", "4 / 3",
          img("Adding and removing items from the cart", { file: "8-V3AddRemoveItemsFromCart.png" }),
          img("V3 order summary", { file: "9-V3OrderSummary.png" }),
        ),
        p("As I introduced more realistic data, however, it became clear that the initial simplified design needed to accommodate greater variation in the information held by different orders. Products could require different fields, and the process for calling them off was not always identical."),
        callout("This was an important point in the design process: the flow needed to work with the complexity of the real system, rather than only looking straightforward with simplified example data."),

        sub("V4", "The agreed design"),
        p("V4 brought the full experience together, from login and successful call-off through to tracking existing deliveries."),
        gallery("feature", "",
          img("V4 flow overview", { file: "10-V4Overview.png" }),
          img("V4 login", { file: "11-V4Login.png" }),
          img("V4 call-off confirmed", { file: "12-V4CalloffConfirmed.png" }),
        ),
        p("As the requirements became clearer, I designed additional components to communicate more complex scenarios, including:"),
        list(
          "Warnings for invalid inputs.",
          "Linked call-offs that needed to be edited in pairs.",
          "Technical drawings and supporting information.",
          "Call-off and delivery statuses.",
          "Additional information needed to support the wider process.",
        ),
        gallery("pair", "1 / 1",
          img("Warning for invalid inputs", { file: "13-V4FFLWarning.png" }),
          img("Technical drawings and supporting information", { file: "14-V4TechnicalDrawings.jpg" }),
        ),
        img("Linked call-offs edited together as a group", { file: "15-V4GroupedCalloffEdits.png" }),
        p("I also explored an alternative calendar view for the tracking page. After hearing that members of the factory team preferred using a physical wall planner to understand upcoming dates, I considered whether a calendar-based interface could reflect that familiar way of working digitally."),
        img("Calendar format for the tracking page", { file: "16-V4CalandarFormat.png", size: "medium" }),
        p("This helped me think beyond the immediate request and consider how different users understood and interacted with delivery information."),
        p("V4 was the agreed direction for the overall portal flow. The shopping cart was explored during the earlier iterations but was not carried forward into the final agreed design."),

        sub("Mobile", "Designing for mobile"),
        p("Alongside the wider portal flow, I created a mobile mock-up to explore how the information-heavy experience could work on smaller screens."),
        img("V4 mobile overview", { file: "17-V4MobileOverview.png", size: "medium" }),
        p("The aim was to retain consistency with the desktop design while tightening the use of space and making considered trade-offs where necessary. For example, instead of squeezing every column of a table onto a narrow screen, less frequently needed information could be placed behind a dropdown, one tap away."),
        img("V4 mobile screens", { file: "18-V4MobileScreens.png" }),
        p("This approach helped preserve readability without removing access to important information. It also reinforced the need to consider responsive behaviour as part of the experience, rather than simply shrinking the desktop layout."),
      ],
    },
    {
      id: "revisiting",
      number: "02",
      title: "Revisiting Track Call-offs",
      blocks: [
        p("After the initial portal design process, the Track Call-offs page needed a more substantial redesign. Once the first version was ready for client testing, additional requirements emerged that changed the purpose and complexity of the page."),
        compare(
          { file: "19-V4TrackCalloffsPage.jpg", label: "V4 design", alt: "Track Call-offs page in the agreed V4 design" },
          { file: "SCMS2DeskTop.png", label: "Redesign", alt: "Redesigned Track Call-offs page" },
          "Drag to compare the Track Call-offs page in the agreed V4 design with the redesign.",
        ),
        p("The client wanted call-offs grouped by delivery rather than displayed as individual items. They also needed site information, including delivery addresses, opening times, delivery instructions and vehicle restrictions, alongside clearer product identification and delivery tracking."),
        p("Trying to fit these requirements into the original design would have made the page increasingly difficult to understand. I was therefore asked to redesign it while keeping the information easy to scan and the experience intuitive."),

        sub("Decision", "Deciding where site information belonged"),
        p("One suggestion was to add a separate step to the journey for site information, between selecting a site and choosing what action to take."),
        p("Although this was a straightforward option to implement, I felt it would introduce unnecessary navigation. Another option was to add all the information to the action page, but this risked distracting from its main purpose: presenting a clear choice between creating a new call-off and requesting an existing one."),
        p("I proposed placing the information on the Track Call-offs page instead. This was a more natural home for reference information that users might need to consult while managing deliveries, without interrupting the main journey."),
        gallery("pair", "16 / 9",
          img("The actions page, kept focused on a single choice", { file: "20-V4ActionsPage.jpg" }),
          img("Site information on the Track Call-offs page", { file: "21-TCPV1-SiteInfo.png" }),
        ),
        p("This decision helped keep the navigation simpler and gave the new information a useful place within the existing experience."),

        sub("Research", "Understanding the existing system and real data"),
        p("Before redesigning the layout, I reviewed the existing SCMS interface to understand how call-offs were grouped, what information was available and which established behaviours were useful to the business."),
        p("Although the legacy interface had clear usability issues, it provided a valuable reference for understanding the underlying process. I also examined real data to identify variations that the new design needed to support. For example, stair deliveries could include floor-level and left-or-right-hand information, whereas decking deliveries did not use those fields. A rigid layout could leave awkward gaps or make some deliveries look incomplete, so the design needed to accommodate different product types without losing consistency."),
        img("The old system showing differing call-off fields", { file: "22-OldSystemDifferingCalloffFields.png", size: "medium" }),
        p("I also identified two issues with the existing interface:"),
        list(
          "Delivery status relied on colour coding without a clear key on the page, meaning users had to find another menu to understand what the colours represented.",
          "Product types were identified using small, vertically oriented text that was easy to overlook among other information.",
        ),
        gallery("pair", "1 / 1",
          img("Old system: colour coding and its separate key", { file: "23-OldSystemColourCodingKey.png" }),
          img("Old system: sideways product-type text", { file: "24-OldSystemSidewaysTypeName.png" }),
        ),
        p("These observations gave me a practical starting point for improving visibility, reducing unnecessary effort and making the page easier to scan."),
      ],
    },
    {
      id: "redesign",
      number: "03",
      title: "Track Call-offs redesign: key decisions",
      blocks: [
        sub("V1", "Grouping information into delivery cards"),
        p("My first redesign moved away from the original list layout and grouped deliveries into cards, with individual call-offs contained within each delivery."),
        img("Track Call-offs V1: the full page", { file: "25-TCPV1FullPage.png", size: "medium" }),
        p("I used consistent blocks of information, spacing and whitespace to make the page feel less cluttered. Longer descriptions could be truncated to keep the layout manageable, with hover tooltips revealing additional information when needed. This applied progressive disclosure: the key information remained visible, while less essential detail was available on demand."),
        gallery("pair", "4 / 3",
          img("Truncated descriptions keep the cards manageable", { file: "26-TCPV1Truncating.png" }),
          img("Hover tooltips reveal the full detail", { file: "27-TCPV1Tooltips.png" }),
        ),
        p("I also reconsidered the filter layout. The existing tabs had been designed for a smaller number of options, but the new requirements introduced additional filters and site information. I brought these controls together in a more flexible layout rather than continuing to add tabs."),
        p("Site information became an expandable panel rather than a separate page. Since users would generally consult it briefly rather than carry out a sequence of actions within it, a dropdown offered access to the information without adding another navigation step."),
        img("Site information panel and combined filters", { file: "28-TCPV1SiteInfoAndFilters.png" }),
        p("Opening times presented a specific layout challenge because some sites could close and reopen during the day. I designed a table with days across the top and time periods down the side, allowing additional time windows to be shown without disrupting the overall structure."),

        sub("Clarity", "Making product types and delivery status easier to recognise"),
        p("I designed custom product icons and paired them with text and colour. For example, stairs and decking had distinct visual identifiers, helping users distinguish deliveries at a glance."),
        img("Custom product type icons", { file: "29-TCPV1ProductTypeIcons.png" }),
        p("I kept the text alongside the colour and icons so the meaning was not communicated through colour alone. This supported clearer identification and made the design more accessible."),
        p("For delivery progress, I used a circular progress indicator with recognisable status colours and an icon to reinforce the meaning. Green indicated completion, amber indicated that a delivery was approaching readiness, and grey was used when there was no imminent progress to report, rather than using red in a way that might imply a problem."),
        img("Delivery status icons", { file: "30-TCPV1DeliveryStatusIcons.png" }),
        p("Clicking the status icon would provide more detailed information, such as a status description, tracking information or delivery documents, depending on the delivery's state."),

        sub("V2", "Removing nested scrolling"),
        p("The initial design received positive feedback during an internal review with the company owner and senior developers. However, they raised concerns about having scrollable delivery cards inside a page that also scrolled."),
        img("V1's scrollable cards inside a scrolling page", { file: "31-TCPV1NestedScroll.png", size: "medium" }),
        callout("This was a useful example of how a design can look organised in a mock-up but still create practical usability issues when interacting with it."),
        p("I explored a second version that allowed delivery cards to expand dynamically and show all their call-offs, rather than hiding items within a fixed-height card."),
        p("A grid layout was no longer suitable because cards in the same row would need to match the height of the largest card. A delivery containing only one call-off could therefore occupy the same height as one containing many."),
        p("My solution was to use full-width delivery cards while keeping the individual call-offs modular. This made the amount of information visible more predictable and removed the need for nested scrolling."),
        p("The trade-off was some additional whitespace when a delivery contained only a small number of call-offs. I considered this preferable to hiding information or creating conflicting scroll areas."),
        p("I also created a mobile version to show how the filters and delivery information could adapt to smaller screens."),
        gallery("wide-narrow", "",
          img("Track Call-offs V2: full-width delivery cards", { file: "32-TCPV2Full.jpg" }),
          img("Track Call-offs V2: mobile", { file: "33-TCPV2Mobile.jpg" }),
        ),
        p("The designs were presented as interactive Figma prototypes, including scrolling, hovering, button interactions and navigation. This allowed the client and different departments to explore the experience and compare the alternatives before deciding which approach best suited their needs."),
        p("Although the client preferred the appearance of V1, they ultimately selected V2 as the safer option."),

        sub("Requirements", "Incorporating further requirements"),
        p("Following client feedback, further requirements were added, including banned vehicles, automatic delays, individual call-off status and a notice at the top of the site information."),
        p("I incorporated these into the design while trying to maintain a clear visual hierarchy. For example, I changed the label “Banned Vehicles” to “Allowed Vehicles”. The underlying information remained the same, but the wording presented it in a more positive and immediately useful way. I paired this with the automatic-delay information and reused the product colours to help users recognise the relevant categories consistently."),
        img("Additional site information, including allowed vehicles and automatic delays", { file: "34-TCPV2AdditionalSiteInfo.png", size: "medium" }),
        p("The individual call-off status was a more challenging design problem."),
        p("The initial request was to use the dark background behind each plot number as a colour-coded status indicator, with a separate key explaining the colours. This came in as a ticket for the development team."),
        img("The GitLab ticket requesting status colours and a key", { file: "35-GitLabTicketToAddStatusColourAndKey.jpg" }),
        p("I felt this would create several issues. Changing the background could reduce the contrast of the white plot-number text, weaken the plot number's visual prominence and introduce more colours into a layout that already used colour to distinguish product types and delivery status."),
        p("The plot number also acted as a visual anchor, helping users identify and scan individual call-offs. Changing its appearance risked undermining that consistency."),
        gallery("pair", "4 / 3",
          img("What the ticket would have looked like", { file: "36-ExampleOfWhatFollowingTicketWouldLookLike.png" }),
          img("Plot numbers remain a strong visual anchor, even when blurred", { file: "37-PlotsAreStrongVisualAnchorEvenWhenBlurred.png" }),
        ),
        p("Instead, I proposed a small progress bar for each call-off, with the status communicated directly within the component. This avoided the need for a separate key and kept the individual status visually distinct from the product and delivery indicators. The alternative was approved."),
        img("Track Call-offs V2 with the call-off status solution", { file: "38-TCPV2FullWithCalloffStatusSolution.jpg", size: "medium" }),

        sub("Filters", "Rethinking the filters"),
        p("I also revisited how users would find deliveries. The existing categories, such as upcoming, recent and historic, did not follow one consistent logic: some options relied on delivery status and others on dates. They also conflicted with the custom date filter that had been added."),
        p("I identified that there was no single option to view all deliveries, meaning users who were unsure of a delivery's date or status could need to search through multiple categories."),
        p("I proposed a more intuitive filtering approach to reduce this uncertainty and make it easier to find the right information. The revised approach was accepted for development."),
        gallery("pair", "2 / 1",
          img("The original filter options", { file: "39-TCPV2OriginalFilterOptions.png" }),
          img("The new filter options, implemented in code", { file: "40-ImplementedFilterOptionsInCode.png" }),
        ),
      ],
    },
    {
      id: "frontend",
      number: "04",
      title: "From design to a working frontend",
      blocks: [
        p("The work has since progressed beyond Figma. I have developed much of the design into a working frontend web application using Vue.js and Tailwind CSS."),
        img("The Track Call-offs page, developed in code", { file: "41-FullPageDevelopedInCode.png", size: "medium" }),
        p("This has allowed me to take the ideas and interactions explored during the design process and begin implementing them within the actual product. It has also given me the opportunity to work across both UX/UI design and development, considering how the intended experience translates into a functioning interface."),
        p("The status detail dialogs I designed are now working components, including proof of delivery and GPS tracking, alongside the progress bars on each call-off."),
        gallery("trio", "16 / 10",
          img("Proof of delivery dialog", { file: "42-TCPV2ProofOfDeliveryDialog.png" }),
          img("GPS tracking", { file: "43-TCPV2GPSTracking.png" }),
          img("Call-off status progress bars in code", { file: "44-TCPV2CalloffStatusProgressBars.png" }),
        ),
        p("The project has not launched yet, so I cannot claim measured improvements in usability or task completion at this stage. However, recent client meetings have been very positive, and the client is keen to release the portal to an initial group of site managers for testing. There is also interest in using the system internally."),
        p("The next important step will be to see how people use the working application in practice, identify any points of friction and refine the experience based on their feedback."),
      ],
    },
    {
      id: "reflection",
      title: "Reflection and learning",
      blocks: [
        p("This project has taught me that good UX design is not just about making an interface look modern. It is about understanding the process behind it, identifying where users may struggle and making decisions that balance business requirements with a clear, usable experience."),
        p("One of the most valuable parts of the work was adapting to changing requirements. The initial portal flow developed through several iterations, and the Track Call-offs page changed significantly once the client identified additional information and tracking needs. Rather than treating these changes as additions to squeeze into the existing design, I reconsidered the structure and explored alternative approaches."),
        p("I also gained confidence in challenging proposed solutions when I could explain the potential impact on usability and accessibility. The call-off status indicator was a good example: instead of implementing the requested colour treatment without question, I considered its effect on contrast, hierarchy and the existing visual language, then proposed an alternative that was approved."),
        p("The project also reinforced the importance of working with realistic data. A design can appear simple when it contains only a few example fields, but real deliveries vary in the information they hold and the way they need to be processed. Understanding these differences early helps create a design that is flexible enough to work beyond the ideal scenario."),
        p("Finally, taking the work from Figma into a working Vue.js and Tailwind CSS application has helped bridge the gap between design and implementation. It has given me a better understanding of how interaction decisions, responsive layouts and component behaviour translate into the finished product."),
        p("Although the portal is not yet live, I am pleased that the client has responded positively and is keen to move towards testing. I look forward to seeing how site managers use it and using that feedback to improve the experience further."),
      ],
    },
  ],
};

// Number placeholder slots in reading order.
let slot = 0;
for (const section of scms2DeepDive.sections) {
  for (const block of section.blocks) {
    if (block.type === "image") block.slot = ++slot;
    if (block.type === "gallery") block.images.forEach((image) => (image.slot = ++slot));
  }
}
