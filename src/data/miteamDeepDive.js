// Images live in /public/mi.teamImages; omit `file` to show a numbered placeholder.
const pub = (file) => `${import.meta.env.BASE_URL}mi.teamImages/${file}`;
const img = (caption, opts = {}) => ({
  type: "image",
  caption,
  alt: opts.alt || caption,
  src: opts.file ? pub(opts.file) : "",
  ratio: opts.ratio || "wide", // placeholder shape: wide | square | tall | banner
  size: opts.size || "full", // full | medium | small
});
// layout: pair | trio | feature (first image tall on the left, rest stacked) | wide-narrow
// ratio: CSS aspect-ratio of each framed real image, e.g. "4 / 3" (ignored by feature and wide-narrow)
const gallery = (layout, ratio, ...images) => ({ type: "gallery", layout, ratio, images });
const compare = (before, after, caption, ratio = "") => ({
  type: "compare",
  before: { ...before, src: pub(before.file) },
  after: { ...after, src: pub(after.file) },
  caption,
  ratio, // CSS aspect-ratio of the slider frame; defaults to 16 / 10
});
const p = (text) => ({ type: "p", text });
const list = (...items) => ({ type: "list", items });
const sub = (label, title) => ({ type: "sub", label, title });
const callout = (text) => ({ type: "callout", text });

export const miteamDeepDive = {
  facts: [
    { label: "Role", value: "UX/UI design, information architecture, interaction design, prototyping and frontend implementation" },
    { label: "Tools", value: "Figma, Vue.js, NestJS, GraphQL, MongoDB, PrimeVue and Chart.js" },
    { label: "Project type", value: "UX/UI redesign and frontend development" },
    { label: "Status", value: "Working application developed; preparing for external deployment" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        compare(
          { file: "1.5-OriginalForComparison.png", label: "Original", alt: "The original mi.team overview page" },
          { file: "1-NewRedesignForComparison.jpg", label: "Redesign", alt: "The redesigned mi.team overview page" },
          "Drag to compare the original overview with the redesign.",
        ),
        p("mi.team is an in-house analytics platform designed to help businesses understand activity across their employees' work computers. It brings together information such as working patterns, productivity, application usage and device health, giving users and managers access to relevant insights from one place."),
        p("The original application already collected a lot of useful data, but its interface had been built without a dedicated design process. Information was presented in a fairly basic template, with inconsistent hierarchy, cluttered layouts and navigation that was not always intuitive."),
        p("In November 2025, the company decided to revisit the project with the intention of developing it into a commercial product that could be licensed to other Managed Service Providers (MSPs) and businesses."),
        p("My task was to take the existing application and completely redesign the user experience, making it modern, engaging and easier to use, while helping the product stand out as something the company could confidently demonstrate and sell."),
        p("I worked through competitor research, iterative Figma designs, weekly feedback sessions and interactive prototypes before helping translate the designs into a working web application."),
        p("The redesign now forms the basis of a much more considered product. Demonstrations have generated interest from potential customers, although the application is still in its early stages and technical work remains before it can be deployed externally."),
      ],
    },
    {
      id: "challenge",
      title: "The challenge",
      blocks: [
        p("The challenge was not simply to make an analytics dashboard look better. The application contained a large amount of information, ranging from high-level productivity statistics to detailed technical information about individual devices."),
        p("Without a clear hierarchy, users had to work harder to understand what mattered, find the information they needed and navigate between related tasks. The existing interface also lacked a consistent visual language, making the product feel more technical and less approachable than I wanted it to be."),
        gallery("pair", "2 / 1",
          img("The original start-up agreement page", { file: "2-OriginalAgreementPage.png" }),
          img("The original Devices page, with its secondary menu and tabs", { file: "3-OriginalDevicePage.png" }),
        ),
        p("There was a wider product challenge, too. mi.team was intended to be a transparent and informative activity-tracking platform, rather than something that felt like hidden employee surveillance. Users could access their own activity and, where permissions allowed, wider team information. They could also mark their own activity as private and manage their profiles."),
        callout("I wanted the design to support that positioning by making information understandable, presenting it in a considered way and giving users a clearer sense of control."),
        p("The main goals were to:"),
        list(
          "Improve usability: make navigation and common tasks more intuitive.",
          "Clarify complex data: establish a meaningful hierarchy and make important information easier to identify.",
          "Increase engagement: create a modern, personalised experience that felt approachable rather than overly technical.",
          "Support transparency: present employee activity in a way that aligned with the product's intended approach to visibility and user control.",
          "Prepare the product for commercial use: create a consistent, polished interface that could support demonstrations and future adoption.",
        ),
      ],
    },
    {
      id: "research",
      number: "01",
      title: "Research and establishing a design direction",
      blocks: [
        p("Before starting the redesign, we explored competing products, to understand what information other platforms provided and how they presented it."),
        p("One observation stood out: the competitors' marketing websites presented modern, visually appealing product, but the interfaces we encountered when demonstrating the software itself felt much older, busier and more complicated."),
        gallery("pair", "16 / 10",
          img("The competitor's marketing website", { file: "4-AdvertiseUICompetitor.webp" }),
          img("The competitor's actual software interface", { file: "5-ActualUICompetitor.webp" }),
        ),
        p("I saw this as an opportunity for mi.team. I wanted the experience users actually interacted with to feel consistent with the quality and confidence of the product being presented to potential customers."),
        p("We also worked closely with the marketing team to align the interface with the product's positioning and avoid a disconnect between how the software was promoted and how it felt to use."),
        p("I began developing design concepts in Figma, with weekly meetings to review progress and gather feedback. I then used that feedback to refine the designs and build towards a completed prototype."),
        img("An early mi.team design concept in Figma", { file: "6-mi.teamV1.png" }),
        p("Interactive prototyping was particularly useful because it allowed us to explore the experience beyond static screens. Animations, click-through navigation and component interactions helped communicate how the product would behave before those decisions were carried into development."),
        p("The design direction focused on three things: clarity, engagement and consistency. I wanted the interface to feel modern and visually interesting, but every design decision still needed to help users understand the information or complete a task."),
        gallery("pair", "16 / 10",
          img("User cards with application icons", { file: "7-UserCardsAndApplicationIcons.png" }),
          img("Colourful charts and user avatars on the overview", { file: "7.5-OverviewColourfulChartsAvatars.png" }),
        ),
      ],
    },
    {
      id: "overview-page",
      number: "02",
      title: "Redesigning the company overview",
      blocks: [
        p("The overview page was designed to provide an at-a-glance picture of activity across the company."),
        p("Rather than presenting every statistic with equal weight, I organised the page into a clearer visual flow. A snapshot of current users sat at the top, followed by analytical charts showing patterns in activity and productivity, with a leaderboard further down."),
        gallery("pair", "2 / 3",
          img("The first overview design (V1)", { file: "8-V1Overview.jpg" }),
          img("The final overview design (V4) with enhanced control over date selection", { file: "8.5-V4Overview.png" }),
        ),
        p("This hierarchy gave users a starting point before inviting them to explore more detailed information."),

        sub("Scanning", "Making data easier to scan"),
        p("I used whitespace, consistent spacing and a variety of chart formats to separate different types of information. A page filled with identical-looking graphs could quickly become repetitive and difficult to navigate, so I used different visualisations where appropriate to help distinguish between the datasets."),
        gallery("pair", "3 / 2",
          img("An individual user page, using doughnut charts for applications, websites and categories", { file: "9-UserGraphs.jpg" }),
          img("An individual device page, using gauges and storage bars for device health", { file: "10-DeviceGraphs.jpg" }),
        ),
        p("The charts were intended to communicate insights such as which applications and websites were used most frequently and how productivity varied throughout the day. Some information refreshed hourly, while the leaderboard refreshed daily."),
        p("Colour helped make the data more visually engaging, but the overall layout was just as important. By giving the information a clearer hierarchy, I aimed to reduce clutter and make it easier to identify patterns without having to examine every statistic individually."),

        sub("Engagement", "Adding personalisation and engagement"),
        p("I also introduced profile pictures alongside usernames and used application logos to represent current activity."),
        p("These small details made the interface feel more personal and helped users recognise people and applications quickly. Clicking on an activity indicator would reveal further information, keeping the main overview relatively simple while allowing users to explore details when needed."),
        gallery("pair", "5 / 4",
          img("User activity with profile pictures and application logos", { file: "11-UserActivity.png" }),
          img("Selecting an activity reveals more in-depth detail", { file: "12-InDepthActivity.png" }),
        ),
        p("The leaderboard introduced another layer of engagement. Potential categories included the most productive or most active users. The intention was to explore how recognition could encourage engagement with the platform and potentially prompt reflection on working habits."),
        img("The leaderboard podium", { file: "13-Podium.png" }),
        callout("This was a design concept intended to support the product's engagement goals, rather than a proven improvement in productivity. Its effectiveness would need to be evaluated with users."),
        p("Overall, the overview was designed to move away from a purely technical dashboard towards something more approachable, informative and engaging."),
      ],
    },
    {
      id: "devices",
      number: "03",
      title: "Making device monitoring more intuitive",
      blocks: [
        p("The Devices section presented a different challenge. The original interface used a secondary device menu alongside the main navigation, with another set of tabs within the content area. Although it was possible to navigate once familiar with the layout, the structure was not immediately obvious."),
        p("Typography and colour were also inconsistent, making it harder to distinguish between the importance of different pieces of information."),

        sub("Journey", "From a cluttered page to a clearer journey"),
        p("I redesigned the experience around a simple principle: show the overview first, then let users explore individual devices when they need more detail."),
        compare(
          { file: "14-OriginalDevicePage.png", label: "Before", alt: "The original Devices page, with its secondary menu and tabs" },
          { file: "15-NewDevicesPage.png", label: "After", alt: "The redesigned Devices page, with cards" },
          "Drag to compare the original Devices page with the redesigned card layout.",
          "2 / 1",
        ),
        p("The main Devices page used cards to present the most relevant information about each system. Rather than trying to display every technical detail in one place, users could select a device to open a dedicated page with more comprehensive information."),
        p("This created a clearer separation between browsing devices and investigating a specific system. It also reduced the need to split the same page into several competing areas."),
        p("I added filters to support different tasks, such as finding a particular device, identifying systems with warnings or pending updates, and checking how long a device had been running without a restart."),
        p("At the top of the page, four summary statistics provided a quick overview of the company's devices. Users could then narrow the results using filters before exploring the relevant systems."),
        img("Summary statistics and filters at the top of the Devices page", { file: "16-DeviceStats.png" }),
        callout("This established a more predictable flow: understand the overall situation, narrow the search and then inspect the results."),

        sub("Health", "Communicating device health at a glance"),
        p("Device monitoring involves a range of technical statuses, including uptime, updates, warnings and battery life. Simply presenting these as numbers would require users to interpret each value individually."),
        p("I used colour to make the general state of a device easier to recognise, with green indicating a healthy state and amber or red drawing attention to information that may require action."),
        gallery("trio", "3 / 2",
          img("An active device, with colour-coded up-time, updates and warnings", { file: "17-Device1.png" }),
          img("An offline device, shown in grey with its pending update and warning", { file: "18-Device2.png" }),
          img("A healthy device: 14 hours up-time and nothing to action", { file: "19-Device3.png" }),
        ),
        p("This was intended to help users identify potential issues quickly, before investigating the specific details. The visual indicators supported scanning, while the more detailed information remained available for users who needed it."),

        sub("Interaction", "Designing a multifunction refresh control"),
        p("One of the more interesting interaction challenges came from the refresh behaviour."),
        p("As a team, we wanted users to be able to keep the device information live, switch automatic updates off, or refresh the information manually. We wanted to support all three behaviours without filling the interface with separate buttons and switches."),
        p("I explored possible controls but could not find an existing component that suited the interaction we had in mind."),
        p("My solution combined a sliding toggle with a refresh button. Users could switch automatic updating on or off through the toggle interaction, while clicking the refresh symbol performed a one-off refresh. The control also used colour to communicate whether automatic updating was enabled, with micro-animations providing feedback during hover and interaction."),
        gallery("trio", "9 / 8",
          img("Automatic updating switched off", { file: "20-RefreshOff.png" }),
          img("A one-off manual refresh", { file: "21-RefreshManual.png" }),
          img("Automatic updating switched on", { file: "22-RefreshAuto.png" }),
        ),
        p("The aim was to make the control compact without sacrificing clarity. Rather than relying on lengthy labels or several separate controls, I used familiar visual conventions and interaction feedback to communicate its behaviour."),
        callout("This was a good example of designing around the actual task rather than simply choosing a standard component because it was readily available."),
      ],
    },
    {
      id: "device-detail",
      number: "04",
      title: "Turning technical data into understandable information",
      blocks: [
        p("The individual device page needed to provide much more detail than the overview. Users might need to investigate a warning, understand a device's specifications or identify a potential cause of performance issues."),
        p("In the original interface, much of this information was hidden behind tabs or presented as plain text. Finding relevant details required additional navigation, and the layout did little to help users understand the information quickly."),
        p("I restructured the page using cards, progress bars and distinct sections, maintaining the same visual language used on the wider Devices page."),
        img("The redesigned mi.team interface", { file: "1-NewRedesignForComparison.jpg" }),

        sub("Storage", "Visualising disk space"),
        p("One example was the presentation of hard-drive usage."),
        p("Instead of relying solely on numbers and percentages, I took inspiration from the storage visualisations used on the iPhone. The design broke down storage into visual proportions, showing how much space was occupied by different types of files."),
        gallery("pair", "1 / 1",
          img("Inspiration: the iPhone storage breakdown", { file: "24-iPhoneStorage.png" }),
          img("The mi.team disk usage breakdown", { file: "25-mi.teamDiskUsage.png" }),
        ),
        p("This made the information easier to interpret at a glance and helped users identify where storage pressure might be coming from when investigating a low-disk-space warning."),
        p("The goal was not to remove technical detail, but to give users a more understandable starting point before they examined the underlying information."),

        sub("Access", "Keeping related information accessible"),
        p("I also separated device specifications and connectivity details into their own sections rather than hiding everything behind tabs."),
        img("Device specifications and connectivity as separate sections", { file: "26-SplitDeviceSpecs.png" }),
        p("This made the page easier to scan and reduced the number of interactions needed to reach important information. The design retained a clear structure while allowing the technical content to remain available to users who needed it."),
        p("I also included a direct route from a device to the associated user's information. This meant users could move between related information without returning to the Users section and searching again."),
        img("A shortcut from a device to its associated user", { file: "27-ShortcutLinkToUser.png" }),
        p("These decisions helped make the interface feel more connected, reducing unnecessary backtracking between common tasks."),
      ],
    },
    {
      id: "settings",
      number: "05",
      title: "Simplifying settings and configuration",
      blocks: [
        p("The redesign also covered the settings used to configure the platform, including the start-up agreement shown before tracking begins, unless the arrangement has already been covered by the relevant employment contracts."),
        p("The original interface placed the agreement editor alongside user exemptions on a shared settings page. I felt these were separate tasks that would be easier to understand if they had their own dedicated pages."),
        compare(
          { file: "29-OriginalSettingsAndStartup.png", label: "Before", alt: "The agreement editor and user exemptions on one shared settings page" },
          { file: "30-NewAgreementPage.png", label: "After", alt: "The dedicated start-up agreement page, with the preview beside the editor" },
          "Drag to compare the original shared settings page with the dedicated start-up agreement page.",
          "16 / 9",
        ),
        p("I introduced an expandable settings section in the main navigation, with individual options for the start-up agreement, exempt users, device locations and user teams. Icons and consistent interaction feedback helped make the different settings easier to recognise."),
        img("The expandable settings navigation", { file: "28-ExpandableSettingsOptions.png", size: "small" }),

        sub("Editing", "Improving the agreement editing experience"),
        p("The start-up agreement page gave the editor more space and allowed me to bring the preview directly onto the same page as the editing controls."),
        p("Previously, users had to make changes, open a separate preview, identify anything that needed correcting, close the preview and repeat the process. Keeping the preview visible alongside the editor allowed users to see the effect of their changes without repeatedly moving between views."),
        p("I also moved the option to enable or disable the pop-up to the top of the page. If a user did not need the agreement pop-up, they should not have to work through the rest of the configuration options to find that control."),
        p("Finally, I removed the option to manually set the dimensions of the pop-up. The original controls did not clearly communicate the units being used, and I could not identify a user need that justified the added complexity."),
        p("Allowing users to fix the dimensions could also create problems on smaller screens, where the pop-up might become difficult to read or close. I preferred a responsive design that adapted to the available screen space."),
        img("The agreement pop-up switched off from the top of the page", { file: "31-AgreementOff.png" }),
        callout("These changes simplified the settings interface while reducing unnecessary steps and avoiding a configuration option that could introduce usability problems."),
      ],
    },
    {
      id: "identity",
      number: "06",
      title: "Balancing usability, accessibility and product identity",
      blocks: [
        p("Across the redesign, I aimed to establish a consistent visual language without making every page look identical."),
        p("Cards, spacing, typography, icons and colour helped communicate relationships between different pieces of information. At the same time, I used different visualisations where they suited the data, rather than forcing every statistic into the same format."),
        gallery("pair", "3 / 4",
          img("Figma component library: the multifunction refresh control, filters, buttons and device cards", { file: "34-ReusableAssets.png" }),
          img("Figma component library: podiums, disk space bar, search and other shared components", { file: "34.5-ReusableAssets.png" }),
        ),
        p("Accessibility was also a consideration throughout the design. I focused on readable typography, sufficient contrast, meaningful hierarchy, clear visual indicators and layouts that could adapt to different screen sizes."),
        p("Colour was used to support recognition, but I also considered how information was labelled and structured so users were not expected to rely on colour alone."),
        gallery("pair", "4 / 3",
          img("Colour-coded productivity bars and activity status on the Users page", { file: "35-colour.png" }),
          img("The Manage Teams page, using the same cards, avatars and spacing", { file: "36-ManageTeamsPage.png" }),
        ),
        p("The wider product identity mattered, too. Because mi.team was intended to be a transparent and approachable platform, I wanted the interface to feel informative and engaging rather than intimidating or unnecessarily technical."),
        p("That meant thinking about how the product would feel to use, not just whether each page displayed the correct information."),
      ],
    },
    {
      id: "product",
      number: "07",
      title: "From Figma to a working product",
      blocks: [
        p("The redesign was developed through repeated cycles of design, feedback and refinement. Weekly meetings brought together input from colleagues across the business, including development, IT, marketing and sales, as well as feedback from client demonstrations."),
        p("I used Figma prototypes to communicate interactions and user journeys before those designs were implemented. This gave the team a more realistic understanding of how the interface would behave and provided a basis for discussing changes."),
        img("The Figma prototype flow", { file: "37-FigmaFlow.png" }),
        p("I then helped bring the designs into a working web application, using the company's development stack, including Vue.js, NestJS, GraphQL and MongoDB."),
        p("This progression from design to implementation was an important part of the project. It meant the work was not limited to static concepts: the redesigned interface could be demonstrated as a functioning application, allowing prospective customers to see more of the intended product experience."),
        gallery("pair", "2 / 3",
          img("The final Figma design", { file: "38-FinalFigmaDesign.png" }),
          img("The same screen in the working application", { file: "39-ActualApplication.png" }),
        ),
        p("There is still technical work to complete before external deployment, including resolving permission issues, fixing crashes and establishing the deployment approach. These are necessary steps before the product can be launched commercially."),
      ],
    },
    {
      id: "outcome",
      title: "Outcome",
      blocks: [
        p("The redesign has given the existing analytics application a more coherent interface, clearer navigation and a more considered approach to presenting complex information."),
        p("The work has also helped prepare the product for commercial demonstrations. Since the redesigned interface has been implemented, multiple MSPs and companies have expressed interest in the product."),
        p("This is encouraging early feedback, particularly because one of the project's original aims was to make the application commercially viable. However, the software has not yet launched externally, and the company has not yet begun generating revenue from it. There are also no measured user-testing results available at this stage."),
        p("The next phase is to resolve the remaining technical issues, establish a reliable external deployment process and gather feedback from users working with the product in practice. That will provide an opportunity to validate the design decisions, identify any remaining friction and make further improvements based on real usage."),
      ],
    },
    {
      id: "reflection",
      title: "Reflection and learning",
      blocks: [
        p("This project helped me develop my approach to designing information-heavy applications. The original software already collected valuable data, but presenting more information did not automatically make the product more useful. The challenge was deciding what users needed to see first, how to organise the information and when to provide more detail."),
        p("The Devices redesign was a particularly good example of this. Separating the overview from the individual device page created a more logical journey, while visualising disk usage and introducing clear status indicators helped make technical information easier to interpret."),
        p("I also learned the value of questioning interactions that appear simple on the surface. The refresh control required me to think carefully about how three related behaviours could work through one compact component. Similarly, the start-up agreement editor benefited from reconsidering the whole workflow rather than simply rearranging its existing controls."),
        p("Working with marketing and development also reinforced the importance of consistency between the product's positioning, its interface and its implementation. A polished design needs to reflect the product users actually receive, and it needs to work within the practical constraints of the software."),
        p("Finally, the project strengthened my understanding of the relationship between UX design and commercial outcomes. The intention was not just to improve an internal tool, but to help turn it into a product that could be demonstrated and sold. The interest generated so far is a positive early sign, although the real test will come when the application is deployed and used more widely."),
        p("For me, mi.team demonstrates the value of combining visual design with practical problem-solving: understanding the information, simplifying the journey and making decisions that support both the people using the product and the business developing it."),
      ],
    },
  ],
};

// Number placeholder slots in reading order.
let slot = 0;
for (const section of miteamDeepDive.sections) {
  for (const block of section.blocks) {
    if (block.type === "image") block.slot = ++slot;
    if (block.type === "gallery") block.images.forEach((image) => (image.slot = ++slot));
  }
}
