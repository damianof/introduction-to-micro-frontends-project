<template>
  <nav class="p-4 flex flex-1 flex-col">
    <ul role="list" class="space-y-1">
      <li>
        <!-- Current: "bg-gray-50", Default: "hover:bg-gray-50" -->
        <a href="#" class="bg-slate-300 block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-white">Dashboard</a>
      </li>
      <li>
        <div>
          <button type="button" class="hover:bg-slate-500 flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-white" aria-controls="sub-menu-1" aria-expanded="false">
            <!-- Expanded: "rotate-90 text-gray-500", Collapsed: "text-gray-400" -->
            <svg class="text-gray-400 h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            Teams
          </button>
          <!-- Expandable link section, show/hide based on state. -->
          <ul class="mt-1 px-2" id="sub-menu-1">
            <li>
              <a href="#" class="hover:bg-gray-50 block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700">Engineering</a>
            </li>
            <li>
              <a href="#" class="hover:bg-gray-50 block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700">Human Resources</a>
            </li>
            <li>
              <a href="#" class="hover:bg-gray-50 block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700">Customer Success</a>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <a href="#" class="hover:bg-slate-500 block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700">Calendar</a>
      </li>
      <li>
        <a href="#" class="hover:bg-slate-500 block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700">Documents</a>
      </li>
      <li>
        <a href="#" class="hover:bg-slate-500 block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700">Reports</a>
      </li>
    </ul>
  </nav>
</template>