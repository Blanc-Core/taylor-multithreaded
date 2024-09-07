# Imports for common elements
from commonElements.basicConfigurations import CreatingDirectory
from commonElements.clearingTextFile import clear_file_if_not_empty
from commonElements.writingToOutputFiles import write_to_output_file
from frontend.longPlanners import OverallPlanner, ModulePlanner
from frontend.PagePlanner import PagePlanner
from frontend.PagePlanner import processPage
from tree.mainTree import TreeProcessor
import json
import concurrent.futures
import traceback
import threading

import re
import logging
from logging.handlers import RotatingFileHandler

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    handlers=[
        RotatingFileHandler('app.log', maxBytes=1000000, backupCount=5),
        logging.StreamHandler()
    ]
)
clear_file_if_not_empty("output.txt")
clear_file_if_not_empty("outputs/ideas.txt")
clear_file_if_not_empty("outputs/content.txt")
clear_file_if_not_empty("outputs/ModulePlannerOutput.txt")
clear_file_if_not_empty("outputs/OverallPlannerOutput.txt")
clear_file_if_not_empty("outputs/PagePlannerOutput.txt")
clear_file_if_not_empty("outputs/plan.txt")

def parseModulePlannerOutput(pageOutput):
    # Split the output into individual pages, keeping the delimiter
    pages = re.split(r'(?=### Page Name:)', pageOutput)
    
    # Remove any empty entries and strip whitespace                                                                                                                                                                                                                                                                                                    
    pages = [page.strip() for page in pages if page.strip()]
    
    return pages

def log_active_threads():
    active_threads = threading.active_count()
    logging.info(f"Active threads: {active_threads}")

def process_page(page):
    log_active_threads()
    pagePlannerJson = processPage(page)
    write_to_output_file(pagePlannerJson, "outputs/PagePlannerOutput.txt")
    logging.info(f"Page output: {pagePlannerJson[:100]}...")  # Log first 100 chars
    data = json.loads(pagePlannerJson)
    processor = TreeProcessor(data)
    processor.process()
    log_active_threads()

def process_module(module):
    log_active_threads()
    module_planner = ModulePlanner(module, "gpt-4o-mini", True)
    module_output = module_planner.generate()
    write_to_output_file(module_output, "outputs/ModulePlannerOutput.txt")
    logging.info(f"Module output: {module_output[:100]}...")  # Log first 100 chars
    parsed_output = parseModulePlannerOutput(module_output)
    
    with concurrent.futures.ThreadPoolExecutor() as page_executor:
        page_futures = [page_executor.submit(process_page, page) for page in parsed_output]
        log_active_threads()
        for future in concurrent.futures.as_completed(page_futures):
            try:
                future.result()
            except Exception as e:
                logging.error(f"Error processing page: {str(e)}")
                logging.error(traceback.format_exc())
    log_active_threads()

planner = OverallPlanner("businessProblem.txt", "gpt-4o-mini", True)
output = planner.generate()

write_to_output_file(output, "outputs/OverallPlannerOutput.txt")
print("###############################################################")
print("overall planner output completed")
print("###############################################################")

#Modules within the overall planner looped 
with concurrent.futures.ThreadPoolExecutor() as module_executor:
    module_futures = [module_executor.submit(process_module, module) for module in output]
    log_active_threads()
    for future in concurrent.futures.as_completed(module_futures):
        try:
            future.result()
        except Exception as e:
            logging.error(f"Error processing module: {str(e)}")
            logging.error(traceback.format_exc())

log_active_threads()
logging.info("All modules and pages processed.")